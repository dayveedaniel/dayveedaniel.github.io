// Article copy is based on the résumé and the corresponding files in reports/.
// Keep unavailable reports null until a matching source is supplied.
export const projects = [
  {
    slug: "multilingual-math", title: "Multilingual math reasoning", category: "Data · Evaluation", section: "projects",
    summary: "Translating GSM8K into Igbo, Hausa, and Yoruba to study mathematical reasoning in low-resource languages.",
    report: null,
    links: [{ label: "Explore the dataset", href: "https://huggingface.co/datasets/dayveedd/gsm8k-lowres-math" }],
    body: `<p>A model that solves a maths problem in English may struggle with the same problem in another language. This project explores that gap for Igbo, Hausa, and Yoruba, using translated problems from GSM8K.</p>
      <h2>Building the dataset</h2><p>I translated the dataset into the three languages and evaluated Qwen and Tiny Aya models for supervised fine-tuning. The work brings dataset preparation and model evaluation together around a concrete task: understanding a word problem and producing a mathematical answer.</p>
      <h2>Why it matters</h2><p>Mathematical reasoning provides a useful way to examine language coverage beyond fluent text generation. The released dataset makes these translated tasks available for further experiments.</p>
      <p>This overview covers the work described in my résumé. A detailed report and benchmark results will be added when available.</p>`
  },
  {
    slug: "nanotitan", title: "nanoTitan", category: "PyTorch · MoE", section: "projects",
    summary: "Attention and normalization improvements for an open-source mixture-of-experts stack.", report: null,
    links: [{ label: "Read Israel Adewuyi’s write-up", href: "https://israel-adewuyi.github.io/blog/2026/distributed/" }],
    body: `<p>This contribution focused on the building blocks inside nanoTitan, an open-source mixture-of-experts stack. The work covered attention computation, projection layers, and normalization.</p>
      <h2>What I changed</h2><p>I added PyTorch scaled dot-product attention (SDPA), with an eager fallback, along with fused query, key, and value projections and RMSNorm. These changes work at the model implementation level, where the choice of attention path and tensor operations shapes how a model runs.</p>
      <h2>Implementation focus</h2><p>The fallback preserves an alternative attention path alongside SDPA. Fusing QKV projections brings the three attention projections into a shared operation, while RMSNorm changes how activations are normalized.</p>
      <p>This summary reflects the contributions listed in my résumé. Performance measurements and a detailed technical report are not yet available here.</p>`
  },
  {
    slug: "ecg-benchmarking", title: "ECG data pipeline for benchmarking", category: "MSc thesis · Data engineering", section: "projects",
    summary: "Collecting, cleaning, and standardizing heterogeneous ECG datasets into a common representation for detector benchmarking.",
    report: { source: "Thesis_final.pdf", file: "ecg-msc-thesis.pdf", label: "MSc thesis (PDF)" },
    body: `<p>ECG datasets arrive with different file formats, sampling rates, units, and annotation conventions. Before atrial-fibrillation detectors can be compared consistently, those differences need to be resolved. My MSc thesis contribution was the data pipeline that collects, cleans, and turns these heterogeneous sources into a common, auditable representation.</p>
      <h2>Collecting data from different sources</h2><p>I built a manifest-driven ingestion pipeline, with dataset configuration files describing where to fetch the data and how to handle it. Separate download strategies support PhysioNet, Zenodo, Figshare, and direct URLs. The pipeline preserves source files and records download metadata so processed recordings can be traced back to their origins.</p>
      <h2>Making heterogeneous data consistent</h2><p>The processing layer reads WFDB, MATLAB, HDF5, and CSV recordings through format-specific readers. It standardizes signal arrays and millivolt units, then resamples recordings to a common target rate—250 Hz in the thesis experiments—with anti-alias filtering. Annotation sample positions are adjusted alongside the waveforms to keep them aligned.</p>
      <p>Waveforms are written to a shared Parquet format, while JSON sidecars preserve annotations and source labels. MinIO stores the files, and PostgreSQL provides a searchable catalogue of recordings, channels, sampling rates, annotation availability, and provenance.</p>
      <h2>What the pipeline enables</h2><p>Downstream benchmarking can use the same recording representation across sources, without repeating dataset-specific parsing and cleaning for every experiment. The thesis demonstrates the pipeline with four datasets from three providers; a broader dataset survey identifies candidates for future expansion.</p>
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
    slug: "llm-guided-pinns", title: "LLM-guided weighting for physics-informed neural networks", category: "Scientific ML · Lead author", section: "research",
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
    summary: "Comparing six optimization methods for reconstructing a sparse preference matrix.",
    report: { source: "HDDA_report.pdf", file: "matrix-factorization.pdf" },
    body: `<p>Recommendation systems often start with an incomplete matrix: users have expressed preferences for some items, but most entries are unknown. Matrix factorization represents users and items through smaller latent vectors, whose products approximate those observed preferences.</p>
      <h2>Six ways to fit the factors</h2><p>Our study compared Gradient Descent (GD), Block Coordinate Descent (BCD), Accelerated Gradient Descent (AGD), Alternating Least Squares (ALS), Weighted SVD, and ADMM. We examined reconstruction error and convergence using a rank of 10 and regularization of 0.01 in the reported comparison.</p>
      <h2>Reported results</h2><div class="table-scroll"><table><caption>Results from the project report; lower RMSE is better.</caption><thead><tr><th scope="col">Method</th><th scope="col">RMSE</th><th scope="col">Iterations</th></tr></thead><tbody><tr><th scope="row">GD</th><td>0.1802</td><td>62</td></tr><tr><th scope="row">BCD</th><td>0.1489</td><td>35</td></tr><tr><th scope="row">AGD</th><td>0.1611</td><td>40</td></tr><tr><th scope="row">ALS</th><td>0.1488</td><td>41</td></tr><tr><th scope="row">Weighted SVD</th><td>0.1487</td><td>40</td></tr><tr><th scope="row">ADMM</th><td>0.5460</td><td>41</td></tr></tbody></table></div>
      <p>Weighted SVD, ALS, and BCD reached similar reconstruction errors, with BCD taking fewer iterations. Iteration counts are not equivalent to wall-clock runtime, since the work per iteration differs by method.</p>
      <h2>Reading the comparison</h2><p>These are results from the project's experimental setup, not a universal ranking of recommendation algorithms. The report does not fully specify the dataset and evaluation split, which limits broader comparisons.</p>
      <p class="article-note">Coauthored with Danil Afonchikov and Kelvin Asu Ekuri.</p>`
  },
  {
    slug: "software-metrics", title: "Selecting software-engineering metrics", category: "Published · Springer 2026", section: "research",
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
      <p class="article-note">First published online <time datetime="2026-10-06">6 October 2026</time>. DOI: <a href="https://doi.org/10.1007/978-3-032-11456-3_30">10.1007/978-3-032-11456-3_30</a>.</p>`
  }
];
