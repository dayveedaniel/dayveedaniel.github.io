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
    category: "GPU systems · Distributed training · Inference", badge: "WIP", section: "future-research", report: null,
    proposal: "hardware_agnostic_pytorch_future_research.md",
    summary: "Exploring a PyTorch execution layer that coordinates inference and training across mixed-vendor GPUs and CPUs.",
    body: `<p><strong>Work in progress.</strong> I’m investigating how a unified execution layer could discover available hardware, configure backend-specific workers, and schedule PyTorch workloads across heterogeneous accelerators.</p>
      <h2>Research focus</h2><p>The proposed design separates hardware discovery, backend provisioning, tensor transport, and workload scheduling. Initial experiments would use separate CUDA and ROCm workers, with a longer-term goal of supporting NVIDIA, AMD, Intel, and CPU execution where compatible.</p>
      <p>The scheduling problem must account for device memory, compute speed, network topology, and transfer costs. I want to compare independent inference-request placement with model partitioning, then investigate gradient exchange and collective communication for distributed training.</p>
      <h2>Next experiments</h2><p>Start with reliable tensor exchange and inference across unlike devices. Add automatic placement, then test training with workers of unequal speed. Compare against single-vendor and manually configured heterogeneous baselines.</p>
      <p>Evaluation would measure numerical correctness, throughput, latency, communication overhead, and peak memory. The goal is to identify when mixed hardware is useful and where backend compatibility or communication costs limit it.</p>`
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
