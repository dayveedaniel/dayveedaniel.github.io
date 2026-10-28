# Future Research Direction 3: AfriDataForge — Synthetic Data Generation and Model Adaptation for Low-Resource African Languages

*Research concept note — October 2026*

## Research Overview

Large language models still exhibit significant performance disparities between high-resource languages and many African languages, including **Yorùbá, Igbo, Hausa, and Nigerian Pidgin**. Existing African-language datasets, instruction-tuned models, and benchmarks demonstrate progress, but the cost of sourcing, curating, and validating high-quality language-specific training data remains a barrier [A2–A5].

**AfriDataForge** (working title) proposes a **reusable, language-configurable synthetic-data-to-model pipeline**. A researcher supplies an appropriately licensed seed corpus, identifies the target language, selects desired tasks, and runs a reproducible workflow to generate candidate examples, score and deduplicate them, incorporate native-speaker review, adapt an open-weight language model, and evaluate whether the added data produces measurable improvements. Initial experiments will focus on Nigerian languages, with the design intended to extend to other underrepresented African languages.

The project draws inspiration from Hugging Face's **FinePhrase** work, which studies transforming source documents into structured synthetic pretraining examples (such as FAQs, tutorials, tables, and problem sets) [A1]. However, FinePhrase is **not** already an end-to-end African-language instruction-fine-tuning pipeline. This project must adapt its document-rewriting methods to the linguistic and cultural characteristics of target languages and distinguish **continued pretraining data** from **instruction-response training data**.

## Central Research Question

> How can a reproducible, language-configurable pipeline generate, filter, and validate high-quality synthetic data from limited authentic African-language resources, and under what conditions does that data improve the language competence, instruction following, and cultural appropriateness of fine-tuned language models?

## Proposed Research Components

1. **Seed data acquisition and provenance.** Assemble a small, diverse set of authentic, appropriately licensed text for each target language, potentially drawing on community-contributed corpora and suitable public datasets. Record document origin, permissions, dialect or variety, domain, speaker/community context where appropriate, and preprocessing decisions. Reserve evaluation sources and document families *before* data generation to reduce test-set leakage.

2. **Configurable synthetic data generation.** Adapt FinePhrase-style grounded rephrasing to produce FAQs, tutorials, summaries, reading-comprehension questions, conversational exchanges, and instruction–response pairs. Compare (a) target-language-first rewriting, (b) translation-mediated generation, and (c) teacher-model-assisted generation. Where appropriate, also create code-switched examples reflecting real language use. Preserve an explicit connection to each source document and flag unverifiable added information [A1, A6].

3. **Automated quality scoring and diversity preservation.** Develop a multilingual filtering pipeline using language identification, script and orthography checks, exact and near-duplicate detection (e.g., hashing/MinHash), semantic similarity, source-groundedness checks, task-format validation, and potentially multiple independent model judges. Measure and remove redundant *or low-quality* content without eliminating valid dialectal, topical, or stylistic variation. Calibrate scores against human judgment; automated scores alone should not be treated as a reliable proxy for language quality.

4. **Native-speaker validation and responsible release.** Use stratified samples reviewed by qualified speakers to assess fluency, factual faithfulness, cultural appropriateness, diacritic and orthographic correctness, and code-switching realism. Incorporate disagreement, reviewer guidance, consent, privacy checks, and documented usage rights. Prior work on human-validated code-switched African-language data provides a model for this step [A6, A7].

5. **Language-model adaptation.** Compare parameter-efficient supervised fine-tuning (LoRA/QLoRA) with, where resources allow, continued pretraining followed by instruction fine-tuning. Test both monolingual and multilingual adaptation, and measure potential regression in other languages. Contrast models trained on authentic data only, unfiltered synthetic data, filtered synthetic data, and mixed authentic/synthetic data [A2, A3].

6. **Evaluation and reproducibility.** Evaluate using held-out, preferably human-authored examples plus applicable tasks from **AfroBench** and **IrokoBench**, supplemented by targeted language-specific tests [A4, A5]. Provide reproducible data-generation configurations, training recipes, metadata, benchmark scripts, model cards, and dataset cards.

## Proposed End-to-End Workflow

```text
User supplies target language + licensed seed documents + target tasks
                             |
                Data inspection and split control
                             |
       FinePhrase-inspired / multilingual synthetic generation
                             |
   Language + groundedness + duplication + semantic-diversity checks
                             |
               Native-speaker quality auditing
                             |
        Versioned curated dataset with provenance and metadata
                             |
          Continued pretraining (optional) / instruction tuning
                             |
       Held-out benchmarks + human evaluation + baseline comparison
                             |
     Released dataset, models, reproducible pipeline, evaluation report
```

## Main Deliverables

1. **An open, documented dataset** for an initial set of Nigerian languages, with separate authentic and synthetic subsets, train/validation/test metadata, generation provenance, license statements, and measured human-validated quality. Dataset release will depend on source permissions and privacy safeguards.
2. **An extensible synthetic-data generation and quality-control pipeline** that accepts a language identifier, source corpus, target tasks, and generation settings, then produces reproducible filtered datasets.
3. **Fine-tuned model checkpoints or adapters** for selected open-weight baselines, plus training configurations and documentation, subject to base-model licenses.
4. **A multilingual evaluation suite and technical report** comparing base models, adapted models, data-generation strategies, synthetic-to-authentic mixing ratios, and filtering schemes.
5. **A research study on synthetic-data quality versus model performance**, reporting trade-offs among generation cost, data volume, linguistic quality, diversity, and downstream gains.

## Experimental Design

A first controlled pilot could use **Yorùbá, Igbo, and Hausa**, followed by Nigerian Pidgin if sufficient seed data and reviewer capacity are available. For each language, fix the target model, training budget, seed documents, and held-out test set; compare at least these conditions:

- **Baseline A:** Unadapted open-weight multilingual or general-purpose model.
- **Baseline B:** Model adapted using authentic seed data only.
- **Experiment C:** Authentic data plus straightforward synthetic expansion without quality filtering.
- **Experiment D:** Authentic data plus FinePhrase-inspired structured generation and automated filtering.
- **Experiment E:** Experiment D plus native-speaker review and targeted data improvements.

Sweep the ratio of original to synthetic examples and the amount of synthetic data. Keep related source documents together in splits so transformed copies cannot contaminate evaluation. Evaluate language identification and adherence, fluency, orthography, factuality, instruction-following, reasoning/QA, translation where appropriate, code-switching, and harmful or culturally inappropriate outputs. Report per-language outcomes rather than only an aggregate score, alongside training/inference costs and reviewer effort. Examine the relative effects of each filtering stage through ablation studies.

## Related Work and Research Gap

**FinePhrase** shows that structured source-document rephrasing can create useful synthetic pretraining material, but its reported results should not be assumed to transfer directly to African languages or instruction tuning [A1]. **AfriInstruct** and **Lugha-Llama** demonstrate that continued pretraining and targeted fine-tuning can improve African-language capability [A2, A3]. **AfroBench** and **IrokoBench** provide evaluation foundations [A4, A5]. **AfroCS-xs** and a 2026 Swahili synthetic-data study illustrate domain- and language-specific synthetic generation with human validation [A6, A7]. Nigeria's **N-ATLaS** is an important existing model initiative against which appropriately matched comparisons may be informative [R2].

**Research gap:** The opportunity is *not* to claim that synthetic African-language datasets or fine-tuned models do not exist. It is to build and evaluate a **generalizable, reproducible pipeline** that links source-grounded generation, quality scoring, diversity, human auditing, model adaptation, and honest downstream evaluation across multiple low-resource languages.

## Scientific and Ethical Challenges

- A teacher model weak in a target language may generate fluent-looking but incorrect, Anglicized, or culturally inappropriate content. Multiple independent teachers and native-speaker review can help identify, but not eliminate, these errors.
- Semantic-similarity filters may incorrectly remove dialects, spelling variants, or code-switched examples. Thresholds must be calibrated by language and domain.
- Synthetic data can amplify errors or erase cultural specificity. A small, authentic, community-reviewed corpus should remain a first-class component of the training mixture.
- Source-text licensing, privacy, attribution, and permission for derivative data must be checked prior to publication; generated outputs are not automatically free of these obligations.
- Improvements must be measured on independent human-authored held-out datasets, not synthetic tests generated by the same pipeline.

## Long-Term Vision

The long-term vision is a **plug-in-your-language, plug-in-your-data** research platform that reduces the cost of adapting open language models to communities underserved by mainstream AI. If successful, the project could yield reusable tools, better evaluation practices, versioned community-governed datasets, and stronger Nigerian-language models while providing empirical guidance on when synthetic augmentation actually helps.

## References — Research Papers

[A1] Niklaus, J., et al. (2026). **How Can We Synthesize High-Quality Pretraining Data? A Systematic Study of Prompt Design, Generator Model, and Source Data.** *arXiv preprint*, arXiv:2604.13977. https://arxiv.org/abs/2604.13977

[A2] Uemura, K., Chen, M., Pejovic, A., Maduabuchi, C., Sun, Y., & Lee, E.-S. A. (2024). **AfriInstruct: Instruction Tuning of African Languages for Diverse Tasks.** *Findings of EMNLP 2024*. https://aclanthology.org/2024.findings-emnlp.793/

[A3] Buzaaba, H., Wettig, A., Adelani, D. I., & Fellbaum, C. (2025). **Lugha-Llama: Adapting Large Language Models for African Languages.** *arXiv preprint*, arXiv:2504.06536. https://arxiv.org/abs/2504.06536

[A4] Ojo, J., Ogundepo, O., Oladipo, A., Ogueji, K., Lin, J., Stenetorp, P., & Adelani, D. I. (2025). **AfroBench: How Good are Large Language Models on African Languages?** *Findings of ACL 2025*. https://aclanthology.org/2025.findings-acl.976/

[A5] Adelani, D. I., et al. (2025). **IrokoBench: A New Benchmark for African Languages in the Age of Large Language Models.** *NAACL 2025*. https://aclanthology.org/2025.naacl-long.139/

[A6] Olaleye, K., et al. (2025). **AfroCS-xs: Creating a Compact, High-Quality, Human-Validated Code-Switched Dataset for African Languages.** *ACL 2025*. https://aclanthology.org/2025.acl-long.1601/

[A7] Gyamfi, S., Kondoro, A. M., Öztürk, Y., Schreiber, R. H., & Borisov, V. (2026). **Synthetic Data Generation Pipeline for Low-Resource Swahili Sentiment Analysis: Multi-LLM Judging with Human Validation.** *AfricaNLP 2026*. https://aclanthology.org/2026.africanlp-main.12/

## References — Project and Data Resources

[R1] Hugging Face. **FinePhrase: The Synthetic Data Playbook.** https://huggingface.co/spaces/HuggingFaceFW/finephrase — code: https://github.com/huggingface/finephrase

[R2] Federal Ministry of Communications, Innovation & Digital Economy, Nigeria. (2025). **Nigeria Launches Landmark AI Model Powered by Awarri to Advance Languages and AI at Scale.** https://fmcide.gov.ng/nigeria-launches-landmark-ai-model-powered-by-awarri-to-advance-languages-and-ai-at-scale/

[R3] Masakhane. **AfriSenti dataset.** https://huggingface.co/datasets/masakhane/afrisenti

*Note: AfriDataForge is a proposed working title and research program; it is not presented as an existing implemented library, released dataset, or trained model.*
