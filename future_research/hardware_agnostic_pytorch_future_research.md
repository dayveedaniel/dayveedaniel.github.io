# Future Research Direction: Hardware-Agnostic and Heterogeneous GPU Execution for PyTorch

*Research concept note — October 2026*

## Research Overview

A promising research direction is the design and implementation of a **hardware-agnostic execution and orchestration layer for PyTorch** that enables AI workloads to run across heterogeneous accelerators, including NVIDIA GPUs, AMD GPUs, Intel GPUs, and CPUs. The goal is to reduce the need for developers to manage vendor-specific software stacks, device placement, inter-device communication, and workload partitioning manually.

PyTorch already supports multiple accelerator backends and a common accelerator-selection interface. In its ROCm build, PyTorch also reuses much of the `torch.cuda` interface. However, this does **not** mean that a single PyTorch process can transparently combine arbitrary NVIDIA and AMD GPUs or efficiently distribute a model across them [D1, D2]. Backend selection and installation can be partially automated, for example using `uv` [D3], but a complete end-to-end heterogeneous execution experience remains a worthwhile systems research target.

## Central Research Question

> How can a unified, hardware-agnostic runtime be designed to provide correct, efficient, and scalable inference and distributed training across mixed-vendor GPUs and CPUs, while requiring minimal modifications to existing PyTorch applications?

## Proposed Research Areas

1. **Automatic hardware discovery and backend management.** Detect available accelerators and their memory, compute capabilities, driver constraints, and supported operations. Select and provision compatible CUDA, ROCm, Intel XPU, or CPU execution environments without assuming that every backend is installed in one Python environment [D1–D3].

2. **Cross-vendor GPU communication.** Investigate interoperable tensor transport and collective operations (such as all-reduce and reduce-scatter) between NVIDIA and AMD workers. Compare host-memory staging, RDMA-enabled approaches, and device-direct transfers. Recent mixed-vendor training and communication studies provide useful foundations [1–3].

3. **Heterogeneous workload scheduling.** Develop topology-, performance-, and memory-aware algorithms for device selection, model partitioning, batching, and load balancing. Related inference systems demonstrate that placement and communication-aware scheduling can improve resource use in heterogeneous clusters [4, 5].

4. **Unified PyTorch execution interface.** Build an accessible API that discovers and configures devices, assigns inference or training tasks to backend-specific workers, and handles data movement and synchronization. Where appropriate, investigate PyTorch's supported distributed backend extension mechanisms [D4].

5. **Performance, robustness, and correctness.** Evaluate communication overhead, numerical consistency, operator coverage, memory pressure, failure recovery, and differences between GPUs of unequal speed. Design graceful CPU fallback where a requested operation lacks suitable GPU support.

## Related Work and Research Gap

Research is already advancing the constituent problems:

- **Mixed-vendor training:** Hu et al. investigate training a single workload using AMD and NVIDIA GPUs and compare CPU-forwarded and device-direct communication strategies [1].
- **Collective communication:** Two distinct studies titled *HetCCL* propose mechanisms for GPU communication across vendor boundaries, including RDMA-oriented designs and portable collectives [2, 3].
- **Heterogeneous inference scheduling:** *HexGen-2* studies disaggregated LLM serving over unequal GPU resources and network links [4]; *Helix* uses a max-flow formulation to jointly optimize placement and request routing [5]. These systems are not, by themselves, universal mixed-vendor PyTorch abstractions.
- **Existing software foundations:** PyTorch offers accelerator APIs and distributed extension points, while `uv` can help select PyTorch package backends [D1, D3, D4]. These solve useful subproblems rather than the entire cross-vendor runtime problem.

**Research gap:** A compelling contribution would be the integration of **hardware discovery, reproducible backend provisioning, cross-vendor communication, and automated scheduling** into a practical, PyTorch-native developer experience. Novelty should be evaluated against specific existing systems; a wrapper that merely selects `cuda` or `cpu` would not be a strong research contribution.

## Proposed Evaluation Plan

A staged implementation can limit risk while producing measurable results:

1. **Prototype:** Discover devices and launch separate CUDA and ROCm workers. Demonstrate reliable tensor exchange and model inference across NVIDIA and AMD GPUs.
2. **Scheduling:** Add automatic placement of independent inference requests, then investigate model partitioning and pipeline execution where cross-device communication is required.
3. **Training:** Add distributed gradient exchange and assess synchronous training across unlike accelerators, including slow-worker effects and convergence behavior.
4. **Benchmarking:** Compare with single-vendor configurations and manually configured heterogeneous baselines. Report throughput, latency, communication bandwidth, GPU utilization, energy or cost where measurable, setup complexity, and numerical correctness.

## Expected Contributions

- A modular **hardware-agnostic PyTorch runtime** with backend-specific worker processes.
- A documented API and reproducible environment-management mechanism for mixed hardware.
- A communication abstraction for supported cross-vendor tensor exchanges and collectives.
- Scheduling and model-partitioning algorithms that account for heterogeneous capabilities and transfer costs.
- An open benchmark suite and empirical characterization of when mixed-vendor execution helps or hurts performance.

## Long-Term Vision

The long-term vision is a **write-once, run-on-available-hardware** experience for PyTorch, where supported inference and training applications can use a combination of GPU vendors and CPUs without extensive hardware-specific code. Such a system could improve utilization of existing accelerators, reduce dependence on a single vendor, and make heterogeneous AI infrastructure more accessible. Importantly, hardware abstraction cannot eliminate unsupported operators, driver restrictions, or physical communication bottlenecks; the research challenge is to manage these constraints transparently and efficiently.

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

*Note: The 2026 HetCCL studies [2] and [3] are separate papers by different author teams, despite sharing the same acronym. The arXiv papers are cited as preprints; do not assume peer review unless a publication venue is independently verified.*
