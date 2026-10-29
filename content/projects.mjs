// Article copy draws on supplied project notes, the résumé, and files in reports/.
// Keep unavailable reports null until a matching source is supplied.
export const projects = [
  {
    slug: "multilingual-math", title: "Multilingual math reasoning", category: "Synthetic data · SFT · Eval", section: "projects",
    date: "2026-07",
    summary: "Synthetic data generation for SFT in local African languages (Igbo, Hausa, and Yoruba), with evaluation to identify harder maths questions.",
    report: null,
    links: [{ label: "Explore the CSV dataset", href: "https://huggingface.co/datasets/dayveedd/gsm8k-lowres-math" }],
    body: `<p>This project uses synthetic data generation to build a supervised fine-tuning (SFT) resource for mathematical reasoning in local African languages (Igbo, Hausa, and Yoruba). It combines translated GSM8K questions, model evaluation, and difficulty filtering to produce a CSV dataset and a harder test split.</p>
      <h2>Synthetic data generation</h2><p><strong>GPT-5.5, through the Codex CLI, generated the main published dataset.</strong> It batch-translated GSM8K’s full training and test sets—7,473 training questions and 1,319 test questions—into all three languages, retaining the original numeric answers as ground truth.</p>
      <h2>Evaluating the translations</h2><p>The harness scores three instruction-tuned solvers: <strong>Qwen2.5-1.5B-Instruct</strong> using vLLM on NVIDIA hardware, and <strong>Tiny Aya Global</strong> and <strong>Tiny Aya Earth</strong> using MLX on Apple Silicon. Their role is to measure mathematical reasoning on the generated data.</p>
      <h2>Exact-match scoring</h2><p>Let <var>y</var><sub>i</sub> be the gold numeric answer and <var>ŷ</var><sub>i</sub> the prediction extracted from the last <code>####</code> answer marker. A missing marker counts as incorrect, even if the correct number appears elsewhere in the response.</p>
      <p>Both values are numerically normalized: dollar signs, grouping commas, and wrapping punctuation are removed, and fractions are evaluated, so <code>1/2</code> and <code>0.5</code> are equivalent. Set <var>c</var><sub>i</sub> = 1 when a prediction exists and the normalized values match exactly; otherwise, <var>c</var><sub>i</sub> = 0. Accuracy over a set <var>S</var> is:</p>
      <p class="equation" role="math" aria-label="Accuracy on S equals one divided by the number of items in S, times the sum of c i over items in S."><var>Acc</var>(<var>S</var>) = <span>1 / |<var>S</var>|</span> · ∑<sub>i ∈ S</sub> <var>c</var><sub>i</sub></p>
      <p>Accuracy is reported overall and per language. Parse and truncation rates provide diagnostics for formatting failures and incomplete generations.</p>
      <h2>Keeping harder questions</h2><p>Tiny Aya Global is sampled 16 times per question at temperature 0.9, with a distinct seed for each generation. If <var>n</var><sub>j</sub> is the number of correct trials, its empirical pass rate is:</p>
      <p class="equation" role="math" aria-label="The estimated pass rate for question j equals the number of correct trials divided by 16."><var>p̂</var><sub>j</sub> = <var>n</var><sub>j</sub> / 16</p>
      <p><strong>Easier questions were filtered out after evaluation.</strong> Questions solved correctly on at least 7 of 16 trials were removed from the hard test split, leaving only those with 0–6 correct trials:</p>
      <p class="equation" role="math" aria-label="The hard test set contains questions j with fewer than seven correct trials."><var>H</var> = { <var>j</var> : <var>n</var><sub>j</sub> &lt; 7 }</p>
      <p>Tiny Aya Earth provides a single-sample comparison. The hard split captures questions that are difficult for the evaluated model and complements the full translated SFT dataset.</p>`
  },
  {
    slug: "nanotitan", title: "nanoTitan", category: "PyTorch · MoE · Distributed training · GPU parallelism", section: "projects",
    summary: "Ongoing collaboration on an educational LLM training framework, with handwritten RoPE and RMSNorm implementations and custom attention kernels planned next.", report: null,
    links: [
      { label: "View nanoTitan on GitHub", href: "https://github.com/israel-adewuyi/nanoTitan" },
      { label: "Read Israel Adewuyi’s write-up", href: "https://israel-adewuyi.github.io/blog/2026/distributed/" }
    ],
    body: `<p><strong>nanoTitan is an ongoing collaboration</strong> on an educational, open-source LLM training framework with a mixture-of-experts stack. The aim is to learn how model components, distributed execution, and GPU kernels work by implementing them ourselves.</p>
      <h2>Learning through implementation</h2><p>Much of the code is handwritten so we can follow the operations, data movement, and synchronization that make training work. The framework provides a place to connect model-level ideas with their execution on GPUs, experiment with alternatives, and understand the trade-offs through correctness tests and profiling.</p>
      <h2>My contributions so far</h2><p>I implemented <strong>rotary positional embeddings (RoPE)</strong> and <strong>RMSNorm</strong>. These are my completed contributions to the model components; custom attention kernels are the next stage of my work.</p>
      <p>Implementing these components by hand is part of the learning process: tracing the tensor operations, understanding their role in the model, and keeping the implementation readable enough to inspect and extend.</p>
      <h2>The wider framework</h2><p>The shared repository includes data, pipeline, and expert parallelism, alongside mixture-of-experts routing and CUDA implementations for token dispatch and combination. It also contains distributed correctness tests, kernel microbenchmarks, and profiling utilities. These provide the surrounding framework for our ongoing contributions and experiments.</p>
      <h2>Next steps</h2><p>My immediate goal is to write <strong>custom GPU kernels for scaled dot-product attention</strong>, then work on a <strong>FlashAttention implementation</strong>. I want to understand and optimize the underlying operations, with forward and backward correctness checks and measurements of runtime and memory use against reference implementations.</p>
      <p>Longer term, we plan to explore tensor parallelism and optimizer-state sharding, while keeping the framework adaptable to evolving LLM architectures. The educational purpose remains central: implement, test, profile, and learn from the results.</p>`
  },
  {
    slug: "ecg-benchmarking", title: "A Comparative Study of Signal Processing and Machine Learning Algorithms for Atrial Fibrillation Detection in Long-Term ECG Monitoring", category: "Data engineering · Time series · Signal processing · PySpark", badge: "MSc thesis", section: "projects",
    date: "2026-06",
    summary: "A dataset-agnostic ECG preparation framework: configurable source adapters, signal and annotation harmonization, and a shared data contract for downstream analysis and benchmarking.",
    report: { source: "Thesis_final.pdf", file: "ecg-msc-thesis.pdf", label: "MSc thesis (PDF)" },
    links: [
      { label: "Dataset on Hugging Face", href: "https://huggingface.co/datasets/dayveedd/ecg-af-250hz" },
      { label: "Framework on GitHub", href: "https://github.com/dayveedaniel/ecg-af-framework" }
    ],
    body: `<p>My MSc thesis contribution is a <strong>dataset-agnostic ECG data preparation framework</strong>. It separates source-specific acquisition, file parsing, and annotation semantics from a shared processing core. A dataset enters through a manifest and the appropriate readers and annotation adapters; the framework then prepares consistent, traceable recordings for downstream analysis and atrial-fibrillation benchmarking.</p>
      <h2>One processing contract across datasets</h2><p>Dataset manifests describe the source, access route, license, annotation type, and adapter choices. Download strategies support PhysioNet, Zenodo, Figshare, and direct URLs, while a format dispatcher routes WFDB, MATLAB, HDF5, and CSV files to their readers. Sampling rate, channel names, and duration are inferred from the recordings where available.</p>
      <p>The common reader contract represents each signal as a samples-by-channels matrix in millivolts. This lets the same downstream transformations handle single-lead and multi-lead recordings. Adding a dataset uses configuration and existing adapters where compatible; a new format or annotation convention can be supported by extending the corresponding adapter without rewriting the processing core.</p>
      <h2>Sampling-rate harmonization</h2><p>The pipeline uses FIR-based polyphase resampling to map each source rate <var>f</var><sub>src</sub> to a configurable target rate <var>f</var><sub>tgt</sub>, set to 250 Hz in the thesis experiments. The conversion ratio is reduced before processing each lead:</p>
      <p class="equation" role="math" aria-label="g equals the greatest common divisor of the source and target sampling rates."><var>g</var> = gcd(<var>f</var><sub>src</sub>, <var>f</var><sub>tgt</sub>)</p>
      <p class="equation" role="math" aria-label="The upsampling factor L equals target rate divided by g; the downsampling factor M equals source rate divided by g."><var>L</var> = <var>f</var><sub>tgt</sub> / <var>g</var>, &nbsp; <var>M</var> = <var>f</var><sub>src</sub> / <var>g</var></p>
      <p>The implementation applies <code>scipy.signal.resample_poly</code> along the time axis. Low-pass anti-alias filtering precedes decimation; the retained band is bounded by min(<var>f</var><sub>src</sub>, <var>f</var><sub>tgt</sub>)/2. Original and target rates remain in the metadata so converted signals can be distinguished from native-rate recordings.</p>
      <h2>Preserving annotation alignment</h2><p>Beat locations, rhythm-episode boundaries, and delineation markers must move with the waveform. Equation (4.1) of the thesis maps each source sample index onto the target grid:</p>
      <p class="equation" role="math" aria-label="The new sample index equals the old sample index times the target sampling rate divided by the source sampling rate, rounded to the nearest integer."><var>i</var><sub>new</sub> = round(<var>i</var><sub>old</sub> · <var>f</var><sub>tgt</sub> / <var>f</var><sub>src</sub>)</p>
      <p>Nearest-sample rounding gives the timing bound described in the thesis:</p>
      <p class="equation" role="math" aria-label="The absolute timing error is at most one divided by twice the target sampling rate, equal to two milliseconds at 250 hertz.">|Δ<var>t</var>| ≤ 1 / (2<var>f</var><sub>tgt</sub>) = 2 ms at 250 Hz</p>
      <p>Annotation adapters preserve source labels alongside mapped rhythm categories and record which adapter produced each mapping. Missing annotations remain explicitly absent. This keeps dataset-specific label decisions auditable and waveform timing consistent for later window construction.</p>
      <h2>Reusable outputs and reproducible ingestion</h2><p>Processed signals are stored as Snappy-compressed Parquet with a sample index and one column per lead. Embedded metadata records source identity, channel names, units, duration, and original and target sampling rates. JSON sidecars hold annotations independently, allowing label mappings to be revised without rewriting large waveform files.</p>
      <p>MinIO stores raw and processed objects; PostgreSQL indexes datasets, recordings, and sampling-rate variants. Download reports retain checksums and provenance. Existing raw downloads can be reused, and catalogue registration uses upserts keyed by recording identity to avoid duplicate rows on reruns. Downstream jobs query this shared catalogue rather than implementing their own source-specific loading logic.</p>
      <p>In the wider thesis framework, PySpark consumes these Parquet outputs for distributed feature generation. It produces time-window features and waveform-window references for downstream models, with the same processing path configurable for a local Spark session or a cluster.</p>
      <h2>Published artifacts</h2><p>I published artifacts from this MSc thesis research so others can use the processed data and run the framework. The <a href="https://huggingface.co/datasets/dayveedd/ecg-af-250hz">ECG-AF-250Hz dataset on Hugging Face</a> contains 1,567 recordings standardized to 250 Hz, totaling approximately 13.4 GB.</p>
      <div class="table-scroll"><table><caption>Recordings in the published dataset</caption><thead><tr><th scope="col">Source</th><th scope="col">Recordings</th></tr></thead><tbody><tr><th scope="row">CPSC 2021</th><td>1,425</td></tr><tr><th scope="row">MIT-BIH Atrial Fibrillation Database</th><td>23</td></tr><tr><th scope="row">AF Termination Challenge</th><td>80</td></tr><tr><th scope="row">Leipzig Heart Center</th><td>39</td></tr></tbody></table></div>
      <p>The release includes Parquet waveforms, JSON annotations, recording metadata, available subject IDs and demographics, source citations, licenses, and checksums. Some rhythm labels are derived by dataset adapters, with the mappings documented in the dataset card. Release validation covered all 3,145 files, and sample download and loading checks passed for every source.</p>
      <p>The <a href="https://github.com/dayveedaniel/ecg-af-framework/releases/tag/v0.1.1">MIT-licensed framework release, v0.1.1</a>, includes Python packages, documentation, and Docker setup. The Docker image was built and tested locally on ARM64.</p>
      <p>These artifacts let downstream benchmarking use a common recording representation across sources, without repeating dataset-specific parsing and cleaning for every experiment.</p>
      <h2>About the thesis</h2><p><cite>A Comparative Study of Signal Processing and Machine Learning Algorithms for Atrial Fibrillation Detection in Long-Term ECG Monitoring</cite>, MSc thesis, Innopolis University, 2026. The shared thesis covers the wider benchmarking framework; my contribution focused on data acquisition, cleaning, harmonization, and pipeline development.</p>
      <p class="article-note">Coauthored with Danil Afonchikov. Supervised by Rustam Lukmanov.</p>`
  },
  {
    slug: "restaurant-forecasting", title: "Restaurant demand forecasting", category: "Airflow · Time series", section: "projects",
    summary: "Hourly order and revenue forecasts for restaurant operations, with automated data and retraining workflows.",
    report: { source: "Bellisimo_pizza_project_report.pdf", file: "restaurant-forecasting.pdf" },
    body: `<p>How many orders should a restaurant prepare for tomorrow evening? For Bellissimo Pizza, our team built a forecasting system to support decisions about staffing, kitchen preparation, and inventory. It predicts hourly order volumes and revenue over 24-, 48-, and 72-hour horizons.</p>
      <h2>From transactions to forecasts</h2><p>The pipeline combines historical sales with weather and holiday information. Features include recent demand, rolling averages, time-of-day patterns, and calendar events. Apache Airflow orchestrates the workflows; PostgreSQL stores data, predictions, and model records; MinIO holds versioned model artifacts. A Streamlit interface exposes the forecasts.</p>
      <p>We explored LightGBM, XGBoost, Random Forest, and Ridge models. The prediction process has two stages: forecast order volume, then use those predictions as inputs to the revenue model.</p>
      <h2>A practical modeling compromise</h2><p>A single pooled model did not capture enough restaurant-level variation, while maintaining a model for every restaurant was costly. Clustering restaurants offered a middle ground. My work covered data and retraining workflows supporting more than 50 restaurants.</p>
      <h2>What the report captures</h2><p>The report documents the architecture, feature engineering, model versioning, and implementation challenges. Item-level forecasting remained limited by late-arriving data. Its 90–95% business-accuracy figure is a target requirement, not a reported validation result.</p>
      <p class="article-note">Team project with Kelvin Asu Ekuri, Danil Afonchikov, and Dadakhon Turgunboev.</p>`
  },
  {
    slug: "advanced-agentic-ai", title: "Agent-inspired RAG", category: "LLMs · Retrieval", section: "projects",
    date: "2025-07",
    aliases: ["llm-project"],
    summary: "A local knowledge assistant with query rewriting, hybrid retrieval, and evidence-based answer generation.",
    report: { source: "AAI Project_report with gitlink.pdf", file: "advanced-agentic-ai.pdf", label: "Agent-inspired RAG report (PDF)" },
    additionalReports: [{ source: "LLM_course_project.pdf", file: "llm-project.pdf", label: "Query-enhanced RAG report (PDF)" }],
    links: [{ label: "View the code", href: "https://github.com/dayveedaniel/intelligent_RAG_system" }],
    body: `<p>A useful knowledge assistant needs to find the right evidence before it can answer well. Our team built a fully local retrieval-augmented generation system that improves a question, finds relevant passages, and generates an answer grounded in that context.</p>
      <h2>From question to answer</h2><p>The workflow separates three responsibilities. The Query Agent interprets intent and reformulates the question. The Retrieval Agent combines semantic similarity with lexical matching to find evidence. The Synthesis Agent prepares the context and integrates the selected passages into an answer.</p>
      <p>Gemma 4B runs locally through Ollama, while MiniLM produces 384-dimensional text embeddings. The retrieval pipeline includes n-gram and fuzzy matching, with embeddings stored in JSON and updated incrementally. FastAPI exposes the services, and a Flutter desktop interface shows the rewritten query, retrieved passages, and answer with source attribution.</p>
      <h2>What we evaluated</h2><p>We used 2,847 Wikipedia articles about artificial intelligence, split into 8,431 chunks, and a set of 100 factual, conceptual, comparative, and technical queries. Wikipedia serves as a stand-in for company documents. The reports discuss retrieval and answer behavior primarily qualitatively; they do not establish a numerical advantage over a conventional RAG baseline.</p>
      <h2>One system, two perspectives</h2><p>The two reports document the same repository and local stack. One focuses on query rewriting and grounded generation; the other explains the responsibilities and coordination of the agent-inspired stages.</p>
      <p>The implemented workflow is sequential. Dynamic agent spawning and meta-reasoning remain proposed extensions. Scaling beyond JSON storage and reducing prompt sensitivity are further engineering questions.</p>
      <p class="article-note">Team project with Kelvin Asu Ekuri and Danil Afonchikov.</p>`
  },
  {
    slug: "kinship-recognition", title: "Kinship recognition", category: "Multimodal ML", section: "projects",
    date: "2025-05",
    summary: "Finding candidate family connections through face and name embeddings, with explainable predictions.",
    report: { source: "AML_team_project_report.pdf", file: "kinship-recognition.pdf" },
    body: `<p>Our team explored whether face images and names could help retrieve candidate family connections from the Families in the Wild dataset. The prototype combines vector search, classification, and visual explanations in a single workflow.</p>
      <h2>Retrieval before classification</h2><p>ArcFace produces 512-dimensional face embeddings, while MiniLM provides optional 384-dimensional name embeddings. Separate FAISS indexes support the two search channels. Reciprocal rank fusion combines their rankings, and a relational database stores people, families, photographs, and relationships.</p>
      <p>A CatBoost model scores candidate family membership using similarities to family members and the family's average face embedding, alongside optional name similarities. A second classifier predicts candidate relationships using pairs of face embeddings and their differences and products.</p>
      <h2>Making predictions inspectable</h2><p>The interface accepts a photograph and an optional name, returns ranked families and possible relationships, and offers an explanation view. SHAP-based heatmaps highlight image regions associated with the model's decision, giving users something to inspect beyond a score.</p>
      <h2>Scope of the result</h2><p>The report presents the system design and example interface outputs rather than a comprehensive quantitative accuracy benchmark. These outputs are model-generated candidates within a research dataset; facial similarity does not verify a biological relationship.</p>
      <p class="article-note">Team project with Danil Afonchikov, Kelvin Asu Ekuri, and Ivan Kiselyov.</p>`
  },
  {
    slug: "highway-reinforcement-learning", title: "Reinforcement learning for highway driving", category: "RL · Evaluation", section: "projects",
    date: "2025-03",
    summary: "Comparing four driving agents—and finding out why fewer collisions can hide the wrong behavior.",
    report: { source: "rl_project.pdf", file: "highway-reinforcement-learning.pdf" },
    body: `<p>A driving agent can improve its reward without learning the behavior we actually want. In this project, our team compared DQN, PPO, TD3, and SAC in the highway-env simulator and examined both their learning curves and their driving behavior.</p>
      <h2>The experiment</h2><p>We used Stable Baselines3 implementations with structured vehicle observations. DQN and PPO operated with discrete actions, while TD3 and SAC used continuous control. The reward encouraged speed and lane preferences while penalizing collisions.</p>
      <p>Average reward and collision rate offered two views of training. Watching the resulting policies provided a third—and proved essential for interpreting those metrics.</p>
      <h2>The reward loophole</h2><p>TD3 appeared to avoid collisions successfully, but did so by drifting off the road. Its low collision rate therefore did not demonstrate safe highway driving. PPO showed the most stable and realistic lane-keeping behavior in the reported experiments; the other agents exhibited different patterns of instability or drift.</p>
      <h2>What I took from it</h2><p>The useful lesson is about evaluation: a score only captures what the environment measures. A collision metric needs to be considered alongside road boundaries and valid driving behavior. The report proposes explicit off-road penalties and richer training setups as next steps.</p>
      <p>These findings concern the particular simulated task and reward configuration, not real-world autonomous-driving performance.</p>
      <p class="article-note">Team project with Kelvin Asu Ekuri, Danil Afonchikov, and Ivan Kiselyov.</p>`
  },
  {
    slug: "software-metrics", title: "Selecting software-engineering metrics", category: "Published · Springer", section: "research",
    summary: "Finding a smaller set of metrics while preserving the geometric relationships in the original data.",
    report: { source: "AMSTA25-21/AMSTA25-21.tex", file: "software-metrics.tex", manuscript: true, note: "The download is the LaTeX manuscript source. The published chapter is available through Springer." },
    links: [
      { label: "Published paper on Springer", href: "https://link.springer.com/chapter/10.1007/978-3-032-11456-3_30" },
      { label: "View the code", href: "https://github.com/dayveedaniel/ASE_Project_team_3/tree/main" }
    ],
    body: `<p>A long list of software metrics is not always more informative. Some measurements overlap, while others contribute little to the structure of a dataset. This work explores how to keep a small subset without losing the relationships between data points.</p>
      <h2>Selecting features by structure</h2><p>Our study uses Equilibrium Optimizer (EO) and Differential Evolution (DE) to search over subsets of metrics. Sammon Error and Kruskal Stress measure how much the reduced representation distorts pairwise relationships. A penalty on subset size encourages compact solutions.</p>
      <p>My contribution included implementing the Equilibrium Optimizer approach. The optimization balances two goals: fewer retained metrics and better preservation of the original geometry.</p>
      <h2>What the manuscript reports</h2><p>In the studied setting, EO reduced 30 metrics to five. The manuscript reports Sammon Error below 0.1 in 85% of EO runs and describes DE as another effective route to compact subsets.</p>
      <h2>Why this is useful</h2><p>Keeping original metrics, rather than replacing them entirely with latent components, can make the reduced dataset easier to interpret. Preserving geometric structure is the objective tested here; it does not by itself establish better downstream prediction accuracy.</p>
      <h2>Publication</h2><p>Marina Kotelevskaya, Daniel David, Nikita Yaneev, and Zamira Kholmatova. <cite>Software Engineering Metrics Selection Using Equilibrium Optimizer and Differential Evolution.</cite> In <cite>Agents and Multi-agent Systems: Technologies and Applications 2025</cite> (KES AMSTA 2025), Smart Innovation, Systems and Technologies, volume 464, pages 359–368. Springer, 2026.</p>
      <p class="article-note">DOI: <a href="https://doi.org/10.1007/978-3-032-11456-3_30">10.1007/978-3-032-11456-3_30</a>.</p>`
  },
  {
    slug: "llm-guided-pinns", title: "LLM-guided weighting for physics-informed neural networks", category: "Scientific ML · Lead author", section: "research",
    date: "2025-10",
    summary: "Using a language model to adjust the balance between physics and boundary-condition losses during training.",
    report: { source: "meta-learners.tex", file: "llm-guided-pinns.tex", manuscript: true },
    body: `<p>Physics-informed neural networks learn solutions that must satisfy both a governing equation and boundary conditions. Those objectives can compete during training. In this lead-authored study, I explored whether a language model could help choose their relative weights.</p>
      <h2>A language model as a training controller</h2><p>The LLM observes training dynamics and residual patterns, then suggests updated loss weights. It acts as a controller around the PINN training loop, rather than replacing the neural network that approximates the physical solution.</p>
      <p>We compared this approach with fixed equal weights and a learning-based adaptive method, LBPINN. The experiments used dimensionless Poiseuille flow across 100 pressure-gradient parameter values and five random seeds.</p>
      <h2>What the comparison showed</h2><p>Adaptive weighting improved convergence relative to fixed weights. LBPINN achieved the fastest early training in the reported experiments, while the LLM approach demonstrated interpretable, reasoning-based adjustments with comparable final loss values. The result supports the feasibility of an LLM controller, rather than a claim that it consistently outperforms learned weighting.</p>
      <h2>The trade-off</h2><p>LLM calls introduce latency, monetary cost, and prompt sensitivity. The evaluation covers one PDE family, so its conclusions do not yet extend to more complex physical systems. The downloadable manuscript contains the experimental setup and discussion.</p>`
  },
  {
    slug: "matrix-factorization", title: "Recommendation systems via matrix factorization", category: "Collaborative filtering", section: "research",
    date: "2024-11",
    summary: "Comparing six optimization methods for reconstructing a sparse preference matrix.",
    report: { source: "HDDA_report.pdf", file: "matrix-factorization.pdf" },
    body: `<p>Recommendation systems often start with an incomplete matrix: users have expressed preferences for some items, but most entries are unknown. Matrix factorization represents users and items through smaller latent vectors, whose products approximate those observed preferences.</p>
      <h2>Six ways to fit the factors</h2><p>Our study compared Gradient Descent (GD), Block Coordinate Descent (BCD), Accelerated Gradient Descent (AGD), Alternating Least Squares (ALS), Weighted SVD, and ADMM. We examined reconstruction error and convergence using a rank of 10 and regularization of 0.01 in the reported comparison.</p>
      <h2>Reported results</h2><div class="table-scroll"><table><caption>Results from the project report; lower RMSE is better.</caption><thead><tr><th scope="col">Method</th><th scope="col">RMSE</th><th scope="col">Iterations</th></tr></thead><tbody><tr><th scope="row">GD</th><td>0.1802</td><td>62</td></tr><tr><th scope="row">BCD</th><td>0.1489</td><td>35</td></tr><tr><th scope="row">AGD</th><td>0.1611</td><td>40</td></tr><tr><th scope="row">ALS</th><td>0.1488</td><td>41</td></tr><tr><th scope="row">Weighted SVD</th><td>0.1487</td><td>40</td></tr><tr><th scope="row">ADMM</th><td>0.5460</td><td>41</td></tr></tbody></table></div>
      <p>Weighted SVD, ALS, and BCD reached similar reconstruction errors, with BCD taking fewer iterations. Iteration counts are not equivalent to wall-clock runtime, since the work per iteration differs by method.</p>
      <h2>Reading the comparison</h2><p>These are results from the project's experimental setup, not a universal ranking of recommendation algorithms. The report does not fully specify the dataset and evaluation split, which limits broader comparisons.</p>
      <p class="article-note">Coauthored with Danil Afonchikov and Kelvin Asu Ekuri.</p>`
  }
];
