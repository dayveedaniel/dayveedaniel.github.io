# Future Research Direction 2: Beyond the Standard Transformer — Synthesizing Alternative LLM Architectures

*Research concept note — October 2026*

## Research Overview

Today's standard autoregressive large language model (LLM) commonly combines a subword tokenizer, an embedding layer, repeated Transformer blocks, and a vocabulary-projection/softmax output head trained with next-token prediction. Yet many individually promising alternatives have been proposed for **how language is represented, processed, remembered, predicted, and generated**. Some have received substantial research attention, but no single design is demonstrably best across model scales, tasks, and hardware constraints.

This research proposes an **LLM architecture playground** for implementing proposed architectural changes and testing them against a documented standard Transformer baseline. A suitable Llama or Qwen model with an available implementation is a candidate starting point; the exact model and configuration remain to be selected. Experiments would replace components one by one, evaluate broader redesigns, and potentially replace all major components when the resulting architecture is coherent. The purpose is to make research proposals easier to reproduce, compare, and develop toward practical adoption.

## Central Research Question

> Can a reproducible architecture playground turn proposed LLM changes—from individual component replacements to complete architectural redesigns—into usable implementations, establish their trade-offs against a documented Transformer baseline, and lower the barrier to wider adoption?

## Candidate Architectural Directions

1. **Tokenization-free or adaptive-granularity language modeling.** Replace fixed subword tokenization with byte-level inputs and dynamically sized patches. The *Byte Latent Transformer (BLT)* demonstrates a viable alternative to fixed-token models at scale [L1]. A key trade-off is that eliminating a tokenizer does **not** eliminate the need for learned input representations or the cost of processing longer byte sequences.

2. **Continuous-output prediction instead of vocabulary-wide token classification.** Test whether a model can predict directly in a learned or pretrained embedding space and recover discrete words through nearest-neighbor, probabilistic, or learned decoding. Kumar and Tsvetkov propose a continuous-output alternative to softmax [L2], while Dudy and Bedrick study its behavior on long-tail words [L3]. More recently, *A Model with No Head and Many Thoughts* replaces the conventional language-model head **during internal reasoning steps**, not for all text output [L4]. *CoDAR* highlights the importance of the final embedding-to-token discretization step in continuous diffusion language models [L12]. This is distinct from removing the input embedding layer. Open questions include vector-space collapse, ambiguous nearest neighbors, output calibration, rare-word coverage, generation diversity, and whether decoding actually saves compute once retrieval is accounted for.

3. **Alternative sequence-processing cores.** Compare standard self-attention with selective state-space models such as *Mamba* [L5], long-convolution operators such as *Hyena* [L6], or recurrent designs such as *RWKV-7* [L7]. Hybrid architectures may offer different quality/throughput/memory trade-offs than fully replacing attention.

4. **Adaptive computation and long-term memory.** Investigate content-dependent compute allocation, as in *Mixture-of-Depths* [L8], and learned long-term memory modules, as in *Titans* [L9]. These ideas target different constraints—how much computation to spend and what information to retain—and therefore may be complementary, but their interactions require empirical validation.

5. **Low-precision architectural design.** Explore methods such as *BitNet b1.58*, which trains with ternary-valued weights, as an architectural choice rather than only post-training compression [L10]. Actual speedups will depend on kernels and hardware, so parameter-count comparisons alone are insufficient.

6. **Alternative generative objectives.** Study masked diffusion-based language modeling, exemplified by *LLaDA* [L11], as a separate generation paradigm. Diffusion training and iterative decoding change the objective and serving pipeline substantially; they should be compared as a distinct experimental branch rather than treated as a trivial drop-in replacement for a softmax head.

## Proposed Research Methodology

A shared experimental workflow would support both incremental replacements and whole-architecture proposals:

1. **Reproducible baseline:** Select a standard Transformer with a documented architecture and available implementation, such as a suitable Llama or Qwen model. Record its configuration and establish reproducible training and evaluation with fixed data, context budgets, compute accounting, and optimizer settings.
2. **Isolated substitutions:** Replace one component at a time—for example, subword tokens with adaptive bytes, self-attention with a state-space block, or the categorical output head with a continuous-output method—and measure what changes.
3. **Broader replacements:** Implement proposed redesigns that replace several components or all major components, provided the resulting architecture has a coherent training and decoding path. Account for interactions between input representation, sequence processing, memory, generation objective, and output decoding.
4. **Train, compare, and diagnose:** Train and evaluate each variant against the baseline under explicit resource budgets. Use ablations to explain outcomes where useful, while allowing complete architectural proposals to be evaluated in their own right. Reserve held-out tasks and datasets for final selection.
5. **Scale validation:** Retest successful small-model findings at larger sizes and longer contexts to determine whether observed advantages persist.

## Evaluation and Scientific Challenges

A fair comparison should control for **training data, training FLOPs, parameter budgets, and inference hardware** wherever possible, and report results under more than one resource-matching regime. For token-free models, traditional token-level perplexity is not directly comparable across tokenizers; use **bits per byte or byte-normalized negative log-likelihood**, along with downstream task measures. Compare accuracy and reasoning, rare-word and multilingual performance, robustness to spelling or tokenization artifacts, long-context retrieval, latency, tokens or bytes per second, peak memory, and energy or cost when measurable.

A particular focus should be whether **continuous embedding-space prediction** genuinely improves the quality–efficiency frontier. Avoid conflating elimination of a vocabulary-wide softmax with elimination of vocabulary lookup: discrete text still needs a decoding rule. Likewise, non-autoregressive diffusion systems require evaluation that fairly reflects the number of denoising steps and the entire generation cost.

## Research Gap and Expected Contributions

Existing literature often evaluates a novel module against a selected baseline, while systematic cross-family comparisons can be difficult because training corpora, scales, objectives, tokenization, and hardware differ. The proposed contribution is a **reproducible implementation and evaluation playground that helps move architecture proposals toward practical adoption**, including:

- An interchangeable set of input, backbone, memory, computation, and output modules where compatibility permits.
- Controlled single-component and interaction studies against a conventional Transformer.
- Implementations and evaluations of broader replacements and complete architectural proposals against the same documented baseline.
- Evidence about which combinations improve quality, efficiency, or robustness—and which combinations fail.
- A clear empirical assessment of continuous-output prediction versus conventional vocabulary projection.
- Reusable benchmarks, implementation details, and cost/quality trade-off analyses to guide future LLM design.

## Long-Term Vision

The long-term goal is to **lower the barrier between proposed LLM architecture changes and mainstream use**. The playground would provide reusable implementations, reproducible training recipes, and clear evaluations so researchers and developers can try ideas without rebuilding the experimental infrastructure. Outcomes may include purpose-built models for long context, efficient inference, multilingual robustness, or reasoning. Negative results would also help establish when a proposed change is not ready for adoption.

## References — Research Papers

[L1] Pagnoni, A., et al. (2025). **Byte Latent Transformer: Patches Scale Better Than Tokens.** *ACL 2025*. https://aclanthology.org/2025.acl-long.453/

[L2] Kumar, S., & Tsvetkov, Y. (2019). **Von Mises-Fisher Loss for Training Sequence to Sequence Models with Continuous Outputs.** *ICLR 2019*. https://arxiv.org/abs/1812.04616

[L3] Dudy, S., & Bedrick, S. (2020). **Long-Tail Predictions with Continuous-Output Language Models.** *WiNLP 2020*. https://aclanthology.org/2020.winlp-1.31/

[L4] Koriagin, N., et al. (2026). **A Model with No Head and Many Thoughts.** *Findings of EMNLP 2026*. https://aclanthology.org/2026.findings-emnlp.430/

[L5] Gu, A., & Dao, T. (2024). **Mamba: Linear-Time Sequence Modeling with Selective State Spaces.** *COLM 2024*. https://arxiv.org/abs/2312.00752

[L6] Poli, M., et al. (2023). **Hyena Hierarchy: Towards Larger Convolutional Language Models.** *ICML 2023*. https://proceedings.mlr.press/v202/poli23a.html

[L7] Peng, B., et al. (2025). **RWKV-7 “Goose” with Expressive Dynamic State Evolution.** *COLM 2025*. https://arxiv.org/abs/2503.14456

[L8] Raposo, D., et al. (2024). **Mixture-of-Depths: Dynamically Allocating Compute in Transformer-Based Language Models.** *arXiv preprint*. https://arxiv.org/abs/2404.02258

[L9] Behrouz, A., Zhong, P., & Mirrokni, V. (2025). **Titans: Learning to Memorize at Test Time.** *NeurIPS 2025*. https://papers.neurips.cc/paper_files/paper/2025/hash/a4ca07aa108036f80cbb5b82285fd4b1-Abstract-Conference.html

[L10] Wang, H., et al. (2025). **BitNet: 1-bit Pre-training for Large Language Models.** *Journal of Machine Learning Research 26*. https://www.jmlr.org/beta/papers/v26/24-2050.html

[L11] Nie, S., et al. (2025). **Large Language Diffusion Models.** *NeurIPS 2025*. https://proceedings.neurips.cc/paper_files/paper/2025/hash/48b383b24230e0e6e649d9c98dae4d8c-Abstract-Conference.html

[L12] Shen, J., Zhao, J., He, Z., & Lin, Z. (2026). **CoDAR: Continuous Diffusion Language Models are More Powerful Than You Think.** *EMNLP 2026*. https://aclanthology.org/2026.emnlp-main.1007/

*Note: These papers propose or investigate different architectural elements; they do not establish that their methods can all be combined or that an integrated model would outperform a well-tuned Transformer.*
