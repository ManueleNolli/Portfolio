// Smooth scroll to an in-page section and show it in the URL. The hash is replaced outside the router on purpose:
// a router navigation would jump instantly (ScrollRestoration) and add a history entry for every section.
// The router's history state is kept, it holds the key ScrollRestoration uses for back/forward.
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  window.history.replaceState(window.history.state, '', `#${id}`)
}
