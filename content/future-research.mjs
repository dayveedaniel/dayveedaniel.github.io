// Concise research directions based on the four concept notes in future_research/.
export const futureResearch = [
  {
    slug: "afridataforge", title: "AfriDataForge: African-language data and model adaptation",
    date: "2026-05",
    category: "African languages · Synthetic data · SFT", badge: "WIP", section: "future-research", report: null,
    proposal: "afridataforge_african_languages_research_direction.md",
    summary: "A proposed pipeline for generating, validating, and using synthetic data to adapt models for underrepresented African languages.",
    body: `<p>AfriDataForge is a proposed, language-configurable pipeline that connects authentic source material, synthetic data generation, quality review, and model adaptation. I plan to start with Igbo, Hausa, and Yoruba, then explore Nigerian Pidgin as suitable data and reviewer capacity become available.</p>
      <h2>What I want to explore</h2><p>Starting from licensed seed documents, the pipeline would generate grounded examples such as reading-comprehension questions, summaries, and instruction–response pairs. Language and orthography checks, deduplication, source-groundedness checks, and native-speaker review would help curate the resulting data while preserving dialectal and topical diversity.</p>
      <h2>How I would evaluate it</h2><p>I plan to compare adaptation using authentic data alone, unfiltered synthetic data, and filtered mixtures, with LoRA or QLoRA for supervised fine-tuning. Continued pretraining would be a separate experimental option. Source families would be separated before generation to reduce evaluation leakage.</p>
      <p>The central question is whether better-curated synthetic data improves language competence, instruction following, and cultural appropriateness. Evaluation would use independent held-out examples, per-language results, and native-speaker assessments, alongside generation and training costs.</p>
      <h2>Intended outcome</h2><p>A reproducible data-to-model workflow, curated datasets, adaptation recipes, and evidence about when synthetic augmentation helps. These are proposed outputs; AfriDataForge is a working title.</p>`
  },
  {
    slug: "heterogeneous-gpu-execution", title: "Hardware-agnostic PyTorch execution",
    date: "2026-07",
    category: "Accelerator systems · Distributed training · Inference", badge: "WIP", section: "future-research", report: null,
    proposal: "hardware_agnostic_pytorch_future_research.md",
    summary: "Reducing accelerator compatibility barriers through a PyTorch execution layer for communication, placement, and distributed workloads across mixed hardware.",
    body: `<p><strong>Work in progress.</strong> I’m exploring a framework that makes available accelerators easier to use together, reducing manual backend setup, device placement, and communication management. The long-term goal is a plug-and-play experience for supported workloads across a mixed-accelerator cluster.</p>
      <h2>Research focus</h2><p>Start with NVIDIA GPUs (CUDA) and AMD GPUs (ROCm), then evaluate Huawei Ascend NPUs (<code>torch_npu</code>), Google TPUs (TorchTPU), Intel GPUs (XPU), Apple GPUs through Metal/MPS, and CPUs. Backend-specific worker processes would expose a common tensor and task interface; support would be established through experiments on available hardware.</p>
      <p>Capability discovery would account for operators, dtypes, memory, device generation, and communication paths—not just vendor names. A transport layer would select verified device-direct paths where supported, or host-mediated exchange otherwise. The scheduler would use transfer costs and worker speed to place computation; a common interface would not imply shared device memory or universal operator support.</p>
      <h2>Research roadmap</h2><ol>
        <li><strong>Two GPUs, one tensor:</strong> exchange a tensor between CUDA and ROCm workers; verify correctness and transfer overhead.</li>
        <li><strong>Basic collectives:</strong> implement or integrate cross-vendor Allreduce, starting with host-mediated communication and comparing existing approaches.</li>
        <li><strong>One training step:</strong> synchronize gradients for a small network across NVIDIA and AMD workers; investigate communication/computation overlap.</li>
        <li><strong>Hardware-aware scheduling:</strong> automate capability discovery, workload placement, and communication-path selection.</li>
        <li><strong>Additional backends:</strong> evaluate Ascend, TPU, XPU, and Metal/MPS workers, subject to operator coverage, platform constraints, and hardware access.</li>
      </ol>
      <p>Evaluation would compare numerical correctness, convergence, throughput, latency, transfer overhead, and peak memory against single-vendor and manually configured heterogeneous baselines. The aim is to establish when mixed hardware helps, including the cost of fallbacks and synchronization.</p>`
  },
  {
    slug: "llm-architecture-synthesis", title: "Beyond the standard Transformer",
    date: "2026-09",
    category: "LLM architectures · Efficient modeling", section: "future-research", report: null,
    proposal: "llm_architecture_synthesis_research_direction.md",
    summary: "An architecture playground for implementing proposed LLM changes and testing them against a documented Transformer baseline.",
    body: `<p>I want to build a <strong>playground for LLM architecture research</strong>: a place to implement proposed architectural changes, train and evaluate them, and make promising ideas easier to reproduce and adopt.</p>
      <h2>Start from a known baseline</h2><p>The starting point would be a standard Transformer with a documented architecture and available implementation, such as a suitable Llama or Qwen model. The exact baseline remains to be selected; its configuration, training setup, and evaluation protocol would be recorded for comparison.</p>
      <h2>Candidate directions</h2><p>Ideas include byte-level or adaptive input representations, state-space and recurrent sequence-processing blocks, long-convolution operators, adaptive computation, learned memory, and low-precision architectures. Continuous-output prediction is a focused direction within this broader study; diffusion-based generation would be evaluated as a separate experimental branch.</p>
      <h2>Replace, train, and compare</h2><p>Experiments would replace components one by one with methods proposed in research, then explore broader redesigns—including replacing all major components where the resulting architecture is coherent. Each variant would be trained and evaluated against the baseline. Ablations would help explain results, while the playground would also support testing whole architectural proposals.</p>
      <p>Comparisons would control training data, compute, parameter budgets, and inference hardware where possible. I would measure task quality, long-context behavior, latency, and memory; byte-normalized measures would support comparisons across different tokenization schemes.</p>
      <h2>From proposals to practical adoption</h2><p>The goal is to lower the barrier between published architecture ideas and usable implementations. Reusable modules, reproducible experiments, and clear quality–efficiency comparisons would help others assess which changes merit wider adoption, including when a proposal fails to improve on the baseline.</p>`
  },
  {
    slug: "beyond-softmax", title: "Beyond softmax: probabilistic embedding-space prediction",
    date: "2026-10",
    category: "Language modeling · Probabilistic outputs", section: "future-research", report: null,
    proposal: "beyond_softmax_probabilistic_embedding_space_language_modeling.md",
    summary: "Investigating continuous and probabilistic output heads as alternatives to vocabulary-wide next-token classification.",
    body: `<p>This proposed study asks whether a language model can predict a compact distribution in embedding space and recover discrete tokens efficiently, while preserving uncertainty and generation quality.</p>
      <h2>Proposed experiments</h2><p>Using comparable Transformer backbones, I plan to compare a conventional softmax head with direct embedding regression, single-distribution outputs, and mixture-density heads. Candidate distributions include Gaussian and von Mises–Fisher models; decoding experiments would explore nearest-neighbor retrieval and hierarchical indexing.</p>
      <h2>The central challenge</h2><p>Any efficiency gain must survive the full training and decoding pipeline, including token retrieval. Continuous densities also need a principled connection to discrete token probabilities. The study would examine ambiguity, multimodal predictions, rare-token behavior, and calibration rather than treating nearest-neighbor lookup alone as a new predictive mechanism.</p>
      <h2>How I would evaluate it</h2><p>Compare generation quality, training stability, inference latency, memory, and retrieval overhead against optimized, weight-tied conventional output layers. The goal is to establish whether continuous outputs offer useful trade-offs, and under which conditions.</p>`
  }
];
