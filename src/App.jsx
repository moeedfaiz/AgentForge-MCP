import { useState } from "react";

const theme = {
  bg: "#081120",
  panel: "#0f1b31",
  panelSoft: "#12203a",
  border: "#223252",
  text: "#e6edf7",
  muted: "#97a6c3",
  primary: "#5b7cff",
  successBg: "#123520",
  successText: "#9ae6b4",
  warningBg: "#4a3412",
  warningText: "#f6d365",
  neutralBg: "#2a3346",
  neutralText: "#d7deea",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${theme.bg} 0%, #09101d 100%)`,
    color: theme.text,
    fontFamily: "Inter, Segoe UI, Arial, sans-serif",
    padding: "28px 20px",
  },
  shell: {
    maxWidth: "1450px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "22px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "430px 1fr",
    gap: "20px",
    alignItems: "start",
  },
  stack: {
    display: "grid",
    gap: "18px",
  },
  card: {
    background: theme.panel,
    border: `1px solid ${theme.border}`,
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.24)",
  },
  subtitle: {
    color: theme.muted,
    marginTop: "8px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    background: theme.panelSoft,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "110px",
    background: theme.panelSoft,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    resize: "vertical",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  },
  button: (loading = false) => ({
    background: loading ? "#42506f" : theme.primary,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "11px 16px",
    fontWeight: 700,
    cursor: loading ? "not-allowed" : "pointer",
  }),
  secondaryButton: {
    background: theme.panelSoft,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "11px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  label: {
    fontSize: "13px",
    color: theme.muted,
    marginBottom: "8px",
    display: "block",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  resultBox: {
    background: theme.panelSoft,
    border: `1px solid ${theme.border}`,
    borderRadius: "14px",
    padding: "14px",
  },
  pre: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: 1.6,
    fontSize: "14px",
  },
  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "12px",
  },
  statCard: {
    background: theme.panelSoft,
    border: `1px solid ${theme.border}`,
    borderRadius: "14px",
    padding: "14px",
  },
  statLabel: {
    color: theme.muted,
    fontSize: "12px",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "20px",
    fontWeight: 800,
  },
  chip: {
    background: theme.panelSoft,
    border: `1px solid ${theme.border}`,
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "13px",
    display: "inline-flex",
    gap: "8px",
    alignItems: "center",
  },
  issueCard: {
    background: theme.panelSoft,
    border: `1px solid ${theme.border}`,
    borderRadius: "14px",
    padding: "12px",
    marginBottom: "10px",
  },
  link: {
    color: "#8ab4ff",
    textDecoration: "none",
  },
  divider: {
    height: "1px",
    background: theme.border,
    margin: "18px 0",
  },
};

function Badge({ mode }) {
  let bg = theme.neutralBg;
  let color = theme.neutralText;
  let text = mode || "unknown";

  if (mode === "llm") {
    bg = theme.successBg;
    color = theme.successText;
    text = "LLM";
  } else if (mode === "fallback") {
    bg = theme.warningBg;
    color = theme.warningText;
    text = "Fallback";
  } else if (mode === "none") {
    text = "No Answer";
  }

  return (
    <span
      style={{
        background: bg,
        color,
        borderRadius: "999px",
        padding: "6px 10px",
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}

function SectionTitle({ children, right }) {
  return (
    <div style={styles.sectionHeader}>
      <h3 style={{ margin: 0, fontSize: "18px" }}>{children}</h3>
      {right}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("Explain the authentication requirements in this project");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [functionName, setFunctionName] = useState("login_user");
  const [testStub, setTestStub] = useState(null);
  const [testStubLoading, setTestStubLoading] = useState(false);

  const [pythonCode, setPythonCode] = useState("def add(a, b):\n    return a + b");
  const [pythonValidation, setPythonValidation] = useState(null);

  const [jsonText, setJsonText] = useState('{"name":"Talha","role":"AI Engineer"}');
  const [jsonValidation, setJsonValidation] = useState(null);

  const [writePath, setWritePath] = useState("tests/test_auth.py");
  const [writeContent, setWriteContent] = useState("");
  const [writeResult, setWriteResult] = useState(null);

  const [issues, setIssues] = useState([]);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [issueTitle, setIssueTitle] = useState("Implement JWT authentication flow");
  const [issueBody, setIssueBody] = useState("AgentForge analysis:\n\nImplement the JWT authentication flow and protected route validation.");
  const [createdIssue, setCreatedIssue] = useState(null);
  const [issueLoading, setIssueLoading] = useState(false);

  const [repoFilePath, setRepoFilePath] = useState("tests/test_auth_from_agentforge.py");
  const [repoCommitMessage, setRepoCommitMessage] = useState("Add auth test generated by AgentForge");
  const [repoPushResult, setRepoPushResult] = useState(null);
  const [repoPushLoading, setRepoPushLoading] = useState(false);

  const [baseBranch, setBaseBranch] = useState("main");
  const [featureBranch, setFeatureBranch] = useState("feature/agentforge-auth-flow");
  const [branchResult, setBranchResult] = useState(null);
  const [branchLoading, setBranchLoading] = useState(false);

  const [prTitle, setPrTitle] = useState("Add auth PR flow test");
  const [prBody, setPrBody] = useState("This PR adds a generated auth test file created by AgentForge.");
  const [prResult, setPrResult] = useState(null);
  const [prLoading, setPrLoading] = useState(false);

  const handleRun = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/tasks/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResult(data);

      if (data?.answer) {
        setIssueBody(
          `AgentForge analysis:\n\n${data.answer}\n\nSuggested follow-up: review and implement the missing requirement(s).`
        );
        setPrBody(
          `AgentForge generated this change based on project analysis.\n\nSummary:\n${data.answer}`
        );
      }
    } catch (error) {
      setResult({
        answer: "Failed to connect to backend.",
        error: String(error),
        plan: [],
        sources: [],
        trace: [],
        evaluation: null,
        answer_mode: "none",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTestStub = async () => {
    setTestStubLoading(true);
    setTestStub(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/actions/generate-test-stub`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ function_name: functionName, language: "python" }),
      });
      const data = await res.json();
      setTestStub(data);
      if (data?.stub) {
        setWriteContent(data.stub);
      }
    } finally {
      setTestStubLoading(false);
    }
  };

  const handleValidatePython = async () => {
    const res = await fetch(`${process.env.VITE_API_BASE_URL}/actions/validate-python`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: pythonCode }),
    });
    setPythonValidation(await res.json());
  };

  const handleValidateJson = async () => {
    const res = await fetch(`${process.env.VITE_API_BASE_URL}/actions/validate-json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: jsonText }),
    });
    setJsonValidation(await res.json());
  };

  const handleWriteFile = async () => {
    const res = await fetch(`${process.env.VITE_API_BASE_URL}/actions/write-file`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_path: writePath, content: writeContent }),
    });
    setWriteResult(await res.json());
  };

  const handleListIssues = async () => {
    setIssuesLoading(true);
    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/github/list-issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: "open", per_page: 10 }),
      });
      const data = await res.json();
      setIssues(Array.isArray(data.issues) ? data.issues : []);
    } finally {
      setIssuesLoading(false);
    }
  };

  const handleCreateIssue = async () => {
    setIssueLoading(true);
    setCreatedIssue(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/github/create-issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: issueTitle, body: issueBody }),
      });
      const data = await res.json();
      setCreatedIssue(data);
      await handleListIssues();
    } finally {
      setIssueLoading(false);
    }
  };

  const handlePushFileToGithub = async () => {
    setRepoPushLoading(true);
    setRepoPushResult(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/github/push-file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_path: repoFilePath,
          content: writeContent,
          commit_message: repoCommitMessage,
          branch: featureBranch || undefined,
        }),
      });

      const data = await res.json();
      setRepoPushResult(data);
    } finally {
      setRepoPushLoading(false);
    }
  };

  const handleCreateBranch = async () => {
    setBranchLoading(true);
    setBranchResult(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/github/create-branch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_branch: featureBranch,
          base_branch: baseBranch,
        }),
      });

      const data = await res.json();
      setBranchResult(data);
    } finally {
      setBranchLoading(false);
    }
  };

  const handleCreatePr = async () => {
    setPrLoading(true);
    setPrResult(null);

    try {
      const res = await fetch(`${process.env.VITE_API_BASE_URL}/github/create-pr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: prTitle,
          body: prBody,
          head_branch: featureBranch,
          base_branch: baseBranch,
          draft: false,
        }),
      });

      const data = await res.json();
      setPrResult(data);
    } finally {
      setPrLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, fontSize: "34px" }}>AgentForge</h1>
          <div style={styles.subtitle}>
            AI engineering copilot for project analysis, developer utilities, and GitHub task workflows
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.stack}>
            <div style={styles.card}>
              <SectionTitle>Project Copilot</SectionTitle>
              <label style={styles.label}>Ask about the current project workspace</label>
              <textarea
                style={styles.textarea}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about your codebase or spec..."
              />
              <div style={{ marginTop: "14px" }}>
                <button onClick={handleRun} disabled={loading} style={styles.button(loading)}>
                  {loading ? "Analyzing..." : "Run Analysis"}
                </button>
              </div>
            </div>

            <div style={styles.card}>
              <SectionTitle>Developer Tools</SectionTitle>

              <label style={styles.label}>Generate Test Template</label>
              <input
                style={styles.input}
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="e.g. login_user"
              />
              <button onClick={handleGenerateTestStub} style={{ ...styles.button(testStubLoading), marginTop: 12 }}>
                {testStubLoading ? "Generating..." : "Generate Test Template"}
              </button>
              {testStub && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{testStub.stub || JSON.stringify(testStub, null, 2)}</pre>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Check Python Code</label>
              <textarea
                style={styles.textarea}
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
              />
              <button onClick={handleValidatePython} style={{ ...styles.secondaryButton, marginTop: 12 }}>
                Check Python Code
              </button>
              {pythonValidation && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{JSON.stringify(pythonValidation, null, 2)}</pre>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Check JSON Payload</label>
              <textarea
                style={styles.textarea}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
              />
              <button onClick={handleValidateJson} style={{ ...styles.secondaryButton, marginTop: 12 }}>
                Check JSON Payload
              </button>
              {jsonValidation && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{JSON.stringify(jsonValidation, null, 2)}</pre>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Save Generated File</label>
              <input
                style={styles.input}
                value={writePath}
                onChange={(e) => setWritePath(e.target.value)}
                placeholder="e.g. tests/test_auth.py"
              />
              <textarea
                style={{ ...styles.textarea, marginTop: 12 }}
                value={writeContent}
                onChange={(e) => setWriteContent(e.target.value)}
                placeholder="Generated file content..."
              />
              <button onClick={handleWriteFile} style={{ ...styles.button(false), marginTop: 12 }}>
                Save File
              </button>
              {writeResult && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{JSON.stringify(writeResult, null, 2)}</pre>
                </div>
              )}
            </div>

            <div style={styles.card}>
              <SectionTitle>GitHub Workspace</SectionTitle>

              <button onClick={handleListIssues} style={styles.secondaryButton}>
                {issuesLoading ? "Loading..." : "Load Open Issues"}
              </button>

              <div style={{ marginTop: "14px" }}>
                {issues.length ? (
                  issues.map((issue) => (
                    <div key={issue.number} style={styles.issueCard}>
                      <div style={{ fontWeight: 700 }}>
                        #{issue.number} - {issue.title}
                      </div>
                      <div style={{ color: theme.muted, marginTop: "6px" }}>
                        State: {issue.state}
                      </div>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ ...styles.link, marginTop: "8px", display: "inline-block" }}
                      >
                        Open issue
                      </a>
                    </div>
                  ))
                ) : (
                  <div style={{ color: theme.muted, marginTop: "12px" }}>
                    No issues loaded yet.
                  </div>
                )}
              </div>

              <div style={styles.divider} />

              <label style={styles.label}>Create GitHub Issue</label>
              <input
                style={styles.input}
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                placeholder="Issue title"
              />
              <textarea
                style={{ ...styles.textarea, marginTop: 12 }}
                value={issueBody}
                onChange={(e) => setIssueBody(e.target.value)}
                placeholder="Issue description..."
              />
              <button onClick={handleCreateIssue} style={{ ...styles.button(issueLoading), marginTop: 12 }}>
                {issueLoading ? "Creating..." : "Create Issue"}
              </button>

              {createdIssue && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <div style={{ fontWeight: 700 }}>
                    Created issue #{createdIssue.number}: {createdIssue.title}
                  </div>
                  <a
                    href={createdIssue.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...styles.link, marginTop: "8px", display: "inline-block" }}
                  >
                    Open created issue
                  </a>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Branch Workflow</label>
              <input
                style={{ ...styles.input, marginBottom: "10px" }}
                value={baseBranch}
                onChange={(e) => setBaseBranch(e.target.value)}
                placeholder="Base branch"
              />
              <input
                style={styles.input}
                value={featureBranch}
                onChange={(e) => setFeatureBranch(e.target.value)}
                placeholder="Feature branch"
              />
              <button onClick={handleCreateBranch} style={{ ...styles.button(branchLoading), marginTop: 12 }}>
                {branchLoading ? "Creating..." : "Create Branch"}
              </button>

              {branchResult && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{JSON.stringify(branchResult, null, 2)}</pre>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Push File To GitHub Repo</label>
              <input
                style={{ ...styles.input, marginBottom: "10px" }}
                value={repoFilePath}
                onChange={(e) => setRepoFilePath(e.target.value)}
                placeholder="e.g. tests/test_auth_from_agentforge.py"
              />
              <input
                style={{ ...styles.input, marginBottom: "10px" }}
                value={repoCommitMessage}
                onChange={(e) => setRepoCommitMessage(e.target.value)}
                placeholder="Commit message"
              />
              <button onClick={handlePushFileToGithub} style={{ ...styles.button(repoPushLoading), marginTop: 0 }}>
                {repoPushLoading ? "Pushing..." : "Push File To Branch"}
              </button>

              {repoPushResult && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <pre style={styles.pre}>{JSON.stringify(repoPushResult, null, 2)}</pre>
                </div>
              )}

              <div style={styles.divider} />

              <label style={styles.label}>Create Pull Request</label>
              <input
                style={{ ...styles.input, marginBottom: "10px" }}
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                placeholder="PR title"
              />
              <textarea
                style={styles.textarea}
                value={prBody}
                onChange={(e) => setPrBody(e.target.value)}
                placeholder="PR description..."
              />
              <button onClick={handleCreatePr} style={{ ...styles.button(prLoading), marginTop: 12 }}>
                {prLoading ? "Creating..." : "Create Pull Request"}
              </button>

              {prResult && (
                <div style={{ ...styles.resultBox, marginTop: "12px" }}>
                  <div style={{ fontWeight: 700 }}>
                    PR #{prResult.number}: {prResult.title}
                  </div>
                  <a
                    href={prResult.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...styles.link, marginTop: "8px", display: "inline-block" }}
                  >
                    Open pull request
                  </a>
                </div>
              )}
            </div>
          </div>

          <div style={styles.stack}>
            <div style={styles.card}>
              <SectionTitle right={<Badge mode={result?.answer_mode} />}>
                Analysis Result
              </SectionTitle>

              {result ? (
                <>
                  <div style={styles.statRow}>
                    <Stat label="Plan Steps" value={result.plan?.length || 0} />
                    <Stat label="Sources" value={result.sources?.length || 0} />
                    <Stat label="Trace Events" value={result.trace?.length || 0} />
                    <Stat label="Quality Score" value={result.evaluation?.score || "N/A"} />
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <SectionTitle>Answer</SectionTitle>
                    <div style={styles.resultBox}>
                      <pre style={styles.pre}>{result.answer}</pre>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <SectionTitle>Sources</SectionTitle>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {(result.sources || []).map((src, idx) => (
                        <div key={idx} style={styles.chip}>
                          <span>{src.file_path}</span>
                          <span style={{ color: "#8ab4ff" }}>score: {src.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <SectionTitle>Agent Plan</SectionTitle>
                    <div style={styles.resultBox}>
                      {(result.plan || []).map((item, idx) => (
                        <div key={idx} style={{ marginBottom: idx === result.plan.length - 1 ? 0 : "10px" }}>
                          <strong>Step {idx + 1}:</strong> {item.step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <SectionTitle>Response Quality</SectionTitle>
                    <div style={styles.resultBox}>
                      <pre style={styles.pre}>{JSON.stringify(result.evaluation, null, 2)}</pre>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <SectionTitle>Activity Log</SectionTitle>
                    <div style={styles.resultBox}>
                      <pre style={styles.pre}>{JSON.stringify(result.trace, null, 2)}</pre>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ color: theme.muted }}>
                  Run an analysis to see the answer, sources, plan, and activity log here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}