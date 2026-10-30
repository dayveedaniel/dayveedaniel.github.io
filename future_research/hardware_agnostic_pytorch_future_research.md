# Heterogeneous accelerator framework

*Research concept note — October 2026*

## Research Overview

A promising research direction is the design and implementation of a **hardware-agnostic execution and orchestration layer for PyTorch** that reduces accelerator compatibility barriers. Initial experiments would connect NVIDIA and AMD GPUs; the longer-term scope includes Huawei Ascend NPUs, Google TPUs, Intel GPUs, Apple GPUs through Metal/MPS, and CPUs. The goal is to reduce manual management of backend environments, device placement, tensor transport, and workload partitioning, moving toward a plug-and-play experience for supported workloads across mixed-accelerator clusters.

PyTorch already supports multiple accelerator backends and a common accelerator-selection interface. In its ROCm build, PyTorch also reuses much of the `torch.cuda` interface. However, this does **not** mean that a single PyTorch process can transparently combine arbitrary NVIDIA and AMD GPUs or efficiently distribute a model across them [D1, D2]. Backend selection and installation can be partially automated, for example using `uv` [D3], but a complete end-to-end heterogeneous execution experience remains a worthwhile systems research target.

## Central Research Question

> How can a unified runtime coordinate correct and efficient inference and distributed training across heterogeneous GPUs, NPUs, TPUs, and CPUs, while minimizing application changes and making hardware constraints explicit?

## Execution Model and Accelerator Scope

The proposed layer would coordinate **backend-specific worker processes**, potentially on different hosts, rather than require every vendor runtime to coexist in one process. A common task and tensor contract would record shape, dtype, layout, ownership, and completion state. Capability discovery would describe supported operators and dtypes, memory capacity, device generation, driver/runtime versions, and tested communication paths. Two devices from the same vendor would not automatically be treated as interchangeable.

| Accelerator | Candidate worker integration | Scope |
| --- | --- | --- |
| NVIDIA GPUs | PyTorch CUDA | Initial tensor exchange and training prototype |
| AMD GPUs | PyTorch ROCm/HIP | Initial counterpart to the CUDA worker |
| Huawei Ascend NPUs | TorchNPU / `torch_npu` [D5] | Later backend integration study |
| Google TPUs | TorchTPU [D6] | Later integration, accounting for TPU runtime and deployment constraints |
| Intel GPUs | PyTorch XPU [D7] | Later backend integration study |
| Apple GPUs | PyTorch MPS using Metal on macOS [D8] | Later worker integration across supported hosts |
| CPUs | PyTorch CPU | Reference computation, staging, and explicit fallback |

These are proposed integration targets, not a claim of implemented interoperability. Ascend NPUs and Google TPUs are distinct accelerator types, not GPUs. A coordinator would select device-direct transport only for a verified compatible path; otherwise, workers could stage tensors through host memory and exchange them over a network. The abstraction would not promise universal operator coverage or direct access to another accelerator's device memory. Unsupported work would be rejected clearly or routed to an explicitly enabled fallback, with the associated cost reported.

## Proposed Research Areas

1. **Automatic hardware discovery and backend management.** Detect device capabilities and provision reproducible, backend-specific worker environments. Start with CUDA and ROCm; investigate the additional integrations above without assuming that every backend is installed in one Python environment [D1–D3, D5–D8].

2. **Cross-accelerator communication.** Investigate tensor transport and collectives, starting with Allreduce between NVIDIA and AMD workers. Establish a host-mediated baseline before testing RDMA or device-direct paths supported by the actual devices, drivers, and network topology. Recent mixed-vendor training and communication studies provide useful foundations [1–3].

3. **Heterogeneous workload scheduling.** Develop topology-, performance-, and memory-aware algorithms for device selection, model partitioning, batching, and load balancing. Related inference systems demonstrate that placement and communication-aware scheduling can improve resource use in heterogeneous clusters [4, 5].

4. **Unified PyTorch execution interface.** Build an accessible API that discovers and configures devices, assigns inference or training tasks to backend-specific workers, and handles data movement and synchronization. Where appropriate, investigate PyTorch's supported distributed backend extension mechanisms [D4].

5. **Performance, robustness, and correctness.** Evaluate communication overhead, numerical consistency, operator coverage, memory pressure, failure recovery, and workers of unequal speed. Make fallback and synchronization behavior explicit so successful execution does not conceal an impractical transfer or compute cost.

## Related Work and Research Gap

Research is already advancing the constituent problems:

- **Mixed-vendor training:** Hu et al. investigate training a single workload using AMD and NVIDIA GPUs and compare CPU-forwarded and device-direct communication strategies [1].
- **Collective communication:** Two distinct studies titled *HetCCL* propose mechanisms for GPU communication across vendor boundaries, including RDMA-oriented designs and portable collectives [2, 3].
- **Heterogeneous inference scheduling:** *HexGen-2* studies disaggregated LLM serving over unequal GPU resources and network links [4]; *Helix* uses a max-flow formulation to jointly optimize placement and request routing [5]. These systems are not, by themselves, universal mixed-vendor PyTorch abstractions.
- **Existing software foundations:** PyTorch offers accelerator APIs and distributed extension points, while `uv` can help select PyTorch package backends [D1, D3, D4]. These solve useful subproblems rather than the entire cross-vendor runtime problem.

**Research gap:** A compelling contribution would be the integration of **hardware discovery, reproducible backend provisioning, cross-vendor communication, and automated scheduling** into a practical, PyTorch-native developer experience. Novelty should be evaluated against specific existing systems; a wrapper that merely selects `cuda` or `cpu` would not be a strong research contribution.

## Research Roadmap

1. **Stage 1 — Two different GPUs, one tensor.** Launch separate NVIDIA CUDA and AMD ROCm workers. Exchange one tensor reliably, then vary shape and supported dtype. Check values against a CPU reference and measure end-to-end latency and effective bandwidth, including device/host copies and synchronization.
2. **Stage 2 — Basic collective communication.** Implement or integrate a cross-vendor Allreduce, initially with host-mediated communication where needed. For worker tensors \(x_r\), verify that every worker receives \(s = \sum_{r=1}^{P} x_r\), within a stated floating-point tolerance. Compare against available heterogeneous communication implementations on matched hardware and transport paths.
3. **Stage 3 — Distributed computation.** Run one small-network training step across NVIDIA and AMD workers with identical initial parameters and a split batch. For local mean gradients \(g_r\) and local batch sizes \(b_r\), aggregate \(\bar g = (\sum_r b_r g_r)/(\sum_r b_r)\); compare the parameter update with a single-worker reference using the full batch. Extend to short convergence runs before exploring communication/computation overlap and synchronization under unequal worker speeds.
4. **Stage 4 — Hardware-aware scheduling.** Add capability discovery, automatic workload placement, and communication-path selection. Profile compute and transfer costs; begin with independent inference requests, then investigate partitioned workloads where communication is necessary. Compare automatic decisions with manually configured placements.
5. **Stage 5 — Additional accelerator backends.** Evaluate Ascend, TPU, Intel XPU, and Metal/MPS workers, subject to supported operators, platform constraints, and available hardware. Establish per-backend correctness and transport support before attempting mixed-cluster training; do not infer compatibility from successful execution on each backend in isolation.

## Evaluation Plan

Compare single-vendor, manually configured heterogeneous, and automatically scheduled configurations using matched models, batch sizes, precision, and convergence targets. Report numerical error and convergence alongside throughput, latency, transfer bandwidth, synchronization time, peak memory, and accelerator utilization. Include host staging and fallback costs in end-to-end measurements; report energy or cost only where measurable. A compatibility matrix should record tested device generations, software versions, operators, dtypes, and transport paths, including unsupported combinations. Setup effort and required application changes would measure progress toward the intended developer experience.

## Expected Contributions

- A modular **hardware-agnostic PyTorch runtime** with backend-specific worker processes.
- A documented API and reproducible environment-management mechanism for mixed hardware.
- A communication abstraction for supported cross-vendor tensor exchanges and collectives.
- Scheduling and model-partitioning algorithms that account for heterogeneous capabilities and transfer costs.
- An open benchmark suite and empirical characterization of when mixed-vendor execution helps or hurts performance.

## Long-Term Vision

The long-term vision is a **write-once, run-on-available-hardware** experience: supported NVIDIA, AMD, Ascend, TPU, Intel, Apple, and CPU workers participating in one coordinated cluster with minimal manual integration. The runtime would discover what each worker can execute and how workers can communicate, then select suitable placements and transport paths. Hardware abstraction cannot eliminate missing operators, platform restrictions, or physical bottlenecks; the research contribution would be managing those constraints correctly and making heterogeneous resources easier to use together.

## References — Research Papers

[1] Hu, J., Jia, T., Zhu, J., & Yu, Z. (2026). **Joint Training on AMD and NVIDIA GPUs.** *arXiv preprint*, arXiv:2602.18007. https://arxiv.org/abs/2602.18007

[2] Kim, H., Lee, J., Kim, T., Park, J., Kim, J., Suh, P., Choi, R. H., Lee, S., & Lee, J. (2026). **HetCCL: Accelerating LLM Training with Heterogeneous GPUs.** *arXiv preprint*, arXiv:2601.22585. https://arxiv.org/abs/2601.22585

[3] Wang, Y., Chang, T., Zhao, Y., Ao, Y., Gu, Z., Li, Z., et al. (2026). **HetCCL: Enabling Collective Communication For Mixed-Vendor Heterogeneous Clusters.** *arXiv preprint*, arXiv:2605.31000. https://arxiv.org/abs/2605.31000

[4] Jiang, Y., Yan, R., & Yuan, B. (2025). **HexGen-2: Disaggregated Generative Inference of LLMs in Heterogeneous Environment.** *International Conference on Learning Representations (ICLR 2025).* https://arxiv.org/abs/2502.07903

[5] Mei, Y., Zhuang, Y., Miao, X., Yang, J., Jia, Z., & Vinayak, R. (2025). **Helix: Serving Large Language Models over Heterogeneous GPUs and Network via Max-Flow.** *Proceedings of ASPLOS 2025.* https://doi.org/10.1145/3669940.3707215

## References — Technical Documentation

[D1] PyTorch. **`torch.accelerator.current_accelerator` API documentation.** https://docs.pytorch.org/docs/stable/generated/torch.accelerator.current_accelerator.html

[D2] PyTorch. **HIP (ROCm) semantics.** https://docs.pytorch.org/docs/stable/notes/hip.html

[D3] Astral. **Using uv with PyTorch — Automatic backend selection.** https://docs.astral.sh/uv/guides/integration/pytorch/

[D4] PyTorch. **Custom distributed backends.** https://docs.pytorch.org/docs/main/distributed/custom_backends.html

[D5] Ascend. **TorchNPU: Ascend adapter for PyTorch.** https://github.com/Ascend/pytorch

[D6] Google Cloud. **PyTorch on Cloud TPU — TorchTPU.** https://docs.cloud.google.com/tpu/docs/pytorch-on-tpu

[D7] PyTorch. **Getting Started on Intel GPU (XPU).** https://docs.pytorch.org/docs/main/notes/get_start_xpu.html

[D8] PyTorch. **MPS backend.** https://docs.pytorch.org/docs/main/notes/mps.html

*Note: The 2026 HetCCL studies [2] and [3] are separate papers by different author teams, despite sharing the same acronym. The arXiv papers are cited as preprints; do not assume peer review unless a publication venue is independently verified.*
