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
        width: 100%;
        height: 100vh;

        /* drawer 100% full screen, default is 256px (or 100%) */
        --mdc-drawer-width: 100%;
      }

      mwc-drawer {
        position: relative;
        z-index: 1;
      }

      /* fab menu button  #fab-menu */ 
      #fab-menu {
        position: fixed;
        bottom: 1.5em;
        right: 2em;
        z-index: 6;

        /* -webkit-transition: 1s ease-in-out; */
        /* -moz-transition: .3s ease-in-out; */
        /* -o-transition: .3s ease-in-out; */
        transition: .3s ease-in-out;
      }

      /* handle the animations */
      #fab-menu[opening] {
        /* -webkit-transform: translateX(-200px); */
        /* -moz-transform: translateX(-200px); */
        /* -o-transform: translateX(-200px); */
        /* -ms-transform: translateX(-200px); */
        /* transform: translateX(-200px); */
        transform: translateX(calc(-50vw + 56px));
      }
      `
  }

  // open / close drawer
  _handleDrawer () {
    this.drawerIsOpen = !this.drawerIsOpen
    // start to open
    if (this.drawerIsOpen) {
      console.log('>> OPENING')
      this.shadowRoot.querySelector('#fab-menu').setAttribute('opening', '')
      this.shadowRoot.querySelector('#fab-menu').setAttribute('icon', 'close')
    }
    // start to close
    if (!this.drawerIsOpen) {
      console.log('>> CLOSING')
      this.shadowRoot.querySelector('#fab-menu').removeAttribute('opening')
      this.shadowRoot.querySelector('#fab-menu').setAttribute('icon', 'menu')
    }
  }

  _handleDrawerOpened () {
    this.drawerIsOpen = true
    // strip the inert attribute (to active fab on opened drawer)
    this.shadowRoot.querySelector('#fab-menu').removeAttribute('inert')
  }

  _handleDrawerClosed () {
    this.drawerIsOpen = false
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
        @MDCDrawer:opened=${this._handleDrawerOpened}
        @MDCDrawer:closed=${this._handleDrawerClosed}>

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
