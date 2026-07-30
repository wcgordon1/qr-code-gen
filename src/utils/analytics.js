const CLARITY_SCRIPT_ID = "microsoft-clarity";

/**
 * Loads Microsoft Clarity when a project ID is provided through the environment.
 *
 * @param {string | undefined} projectId - The Microsoft Clarity project ID.
 * @returns {void}
 */
export function loadMicrosoftClarity(projectId) {
  if (!projectId || document.getElementById(CLARITY_SCRIPT_ID)) {
    return;
  }

  window.clarity =
    window.clarity ||
    function queueClarityEvent(...eventArguments) {
      window.clarity.q = window.clarity.q || [];
      window.clarity.q.push(eventArguments);
    };

  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  document.head.appendChild(script);
}
