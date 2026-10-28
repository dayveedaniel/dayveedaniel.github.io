// Concise research directions based on the four concept notes in future_research/.
export const futureResearch = [
  {
    slug: "afridataforge", title: "AfriDataForge: African-language data and model adaptation",
    category: "African languages · Synthetic data · SFT", section: "future-research", report: null,
    summary: "A proposed pipeline for generating, validating, and using synthetic data to adapt models for underrepresented African languages.",
    body: `<p>AfriDataForge is a proposed, language-configurable pipeline that connects authentic source material, synthetic data generation, quality review, and model adaptation. I plan to start with Igbo, Hausa, and Yoruba, then explore Nigerian Pidgin as suitable data and reviewer capacity become available.</p>
      <h2>What I want to explore</h2><p>Starting from licensed seed documents, the pipeline would generate grounded examples such as reading-comprehension questions, summaries, and instruction–response pairs. Language and orthography checks, deduplication, source-groundedness checks, and native-speaker review would help curate the resulting data while preserving dialectal and topical diversity.</p>
      <h2>How I would evaluate it</h2><p>I plan to compare adaptation using authentic data alone, unfiltered synthetic data, and filtered mixtures, with LoRA or QLoRA for supervised fine-tuning. Continued pretraining would be a separate experimental option. Source families would be separated before generation to reduce evaluation leakage.</p>
      <p>The central question is whether better-curated synthetic data improves language competence, instruction following, and cultural appropriateness. Evaluation would use independent held-out examples, per-language results, and native-speaker assessments, alongside generation and training costs.</p>
      <h2>Intended outcome</h2><p>A reproducible data-to-model workflow, curated datasets, adaptation recipes, and evidence about when synthetic augmentation helps. These are proposed outputs; AfriDataForge is a working title.</p>`
  },
  {
    slug: "heterogeneous-gpu-execution", title: "Hardware-agnostic PyTorch execution",
    category: "GPU systems · Distributed training · Inference", badge: "WIP", section: "future-research", report: null,
    summary: "Exploring a PyTorch execution layer that coordinates inference and training across mixed-vendor GPUs and CPUs.",
    body: `<p><strong>Work in progress.</strong> I’m investigating how a unified execution layer could discover available hardware, configure backend-specific workers, and schedule PyTorch workloads across heterogeneous accelerators.</p>
      <h2>Research focus</h2><p>The proposed design separates hardware discovery, backend provisioning, tensor transport, and workload scheduling. Initial experiments would use separate CUDA and ROCm workers, with a longer-term goal of supporting NVIDIA, AMD, Intel, and CPU execution where compatible.</p>
      <p>The scheduling problem must account for device memory, compute speed, network topology, and transfer costs. I want to compare independent inference-request placement with model partitioning, then investigate gradient exchange and collective communication for distributed training.</p>
      <h2>Next experiments</h2><p>Start with reliable tensor exchange and inference across unlike devices. Add automatic placement, then test training with workers of unequal speed. Compare against single-vendor and manually configured heterogeneous baselines.</p>
      <p>Evaluation would measure numerical correctness, throughput, latency, communication overhead, and peak memory. The goal is to identify when mixed hardware is useful and where backend compatibility or communication costs limit it.</p>`
  },
  {
    slug: "llm-architecture-synthesis", title: "Beyond the standard Transformer",
    category: "LLM architectures · Efficient modeling", section: "future-research", report: null,
    summary: "A proposed framework for testing alternative language-model components individually and in controlled combinations.",
    body: `<p>I want to explore which changes to language representation, sequence processing, memory, and output prediction work well together. The aim is a reproducible architecture-synthesis framework that tests alternatives against a conventional Transformer baseline.</p>
      <h2>Candidate directions</h2><p>Ideas include byte-level or adaptive input representations, state-space and recurrent sequence-processing blocks, long-convolution operators, adaptive computation, learned memory, and low-precision architectures. Continuous-output prediction is a focused direction within this broader study; diffusion-based generation would be evaluated as a separate experimental branch.</p>
      <h2>Experimental approach</h2><p>Establish a baseline, change one component at a time, and combine only promising, compatible substitutions. Ablation studies would test whether improvements come from individual components or their interactions, followed by checks at larger scales and longer contexts.</p>
      <p>Comparisons would control training data, compute, parameter budgets, and inference hardware where possible. I would measure task quality, long-context behavior, latency, and memory; byte-normalized measures would support comparisons across different tokenization schemes.</p>
      <h2>What I hope to learn</h2><p>Which combinations improve the quality–efficiency trade-off, which fail, and why. The intended outcome is reusable evaluation infrastructure and empirical guidance, rather than an assumption that combining more novel components produces a better model.</p>`
  },
  {
    slug: "beyond-softmax", title: "Beyond softmax: probabilistic embedding-space prediction",
    category: "Language modeling · Probabilistic outputs", section: "future-research", report: null,
    summary: "Investigating continuous and probabilistic output heads as alternatives to vocabulary-wide next-token classification.",
    body: `<p>This proposed study asks whether a language model can predict a compact distribution in embedding space and recover discrete tokens efficiently, while preserving uncertainty and generation quality.</p>
      <h2>Proposed experiments</h2><p>Using comparable Transformer backbones, I plan to compare a conventional softmax head with direct embedding regression, single-distribution outputs, and mixture-density heads. Candidate distributions include Gaussian and von Mises–Fisher models; decoding experiments would explore nearest-neighbor retrieval and hierarchical indexing.</p>
      <h2>The central challenge</h2><p>Any efficiency gain must survive the full training and decoding pipeline, including token retrieval. Continuous densities also need a principled connection to discrete token probabilities. The study would examine ambiguity, multimodal predictions, rare-token behavior, and calibration rather than treating nearest-neighbor lookup alone as a new predictive mechanism.</p>
      <h2>How I would evaluate it</h2><p>Compare generation quality, training stability, inference latency, memory, and retrieval overhead against optimized, weight-tied conventional output layers. The goal is to establish whether continuous outputs offer useful trade-offs, and under which conditions.</p>`
  }
];
