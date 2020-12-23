import { LitElement, html, css } from 'lit-element'

/* material design modules */
import '@material/mwc-drawer'
import '@material/mwc-fab'
import '@material/mwc-icon'
import '@material/mwc-icon-button'

class PwaLite extends LitElement {
  // properties
  static get properties () {
    return {
      title: String,
      drawerIsOpen: Boolean
    }
  }

  constructor () {
    super()
    // init
    this.drawerIsOpen = false
  }

  static get styles () {
    return css`

      [hidden] { 
        display: none !important; 
      }

      :host {
        display: block;
        position: relative;
        /* CSS variables & Global styles */ 

        /* drawer 100% full screen, default is 256px (or 100%) */
        --mdc-drawer-width: 100%;
      }

      /* drawer */
      .drawer-content {
        background-color: var(--mdc-theme-background);
      }

      #container {
        position: relative;
        background-color: var(--mdc-theme-background);
        /* overflow: hidden; */
      }
      
      .main-content {
        min-height: 300px;
        padding: 48px 18px 0 18px;
      }

      /* fab menu button */ 
      #fab-menu {
        position: fixed;
        bottom: 1.5em;
        right: 2em;
        z-index: 10;
      }
      `
  }

  // open / close drawer
  _handleDrawer () {
    console.log('@Handled')
    // TODO
    this.shadowRoot.querySelector('#fab-menu').style.opacity = '0.7'
    this.shadowRoot.querySelector('#fab-menu').style.transform = 'translateX(-200px)'
    this.shadowRoot.querySelector('#fab-menu').style.zIndex = '10'
    this.drawerIsOpen = !this.drawerIsOpen
  }

  render () {
    return html`
      <!-- Main -->
      <main>
      <!-- Layout -->
      <mwc-drawer
        hasHeader 
        type="modal" 
        ?open="${this.drawerIsOpen}" 
        @MDCDrawer:opened="${() => this.drawerIsOpen = true}"
        @MDCDrawer:closed="${() => this.drawerIsOpen = false}">

        <span slot="title">Drawer Title</span>
        <span slot="subtitle">subtitle</span>

        <!-- Drawer Menu Content --> 
        <div class="drawer-content">
          
          Here some drawer content

        </div>

        <!-- Drawer Content --> 
        <div id="container" slot="appContent">

          
        </div>

      </mwc-drawer>
      
      <!-- Absolute fab -->
      <mwc-fab
        id="fab-menu"
        icon="menu"
        label="menu"
        @click="${this._handleDrawer}">
      </mwc-fab> 

      </main>
    `
  }
}

customElements.define('pwa-lite', PwaLite)
