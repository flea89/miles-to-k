/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import './converter.js'

class MyView1 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
      converter-el {
        min-height: 100vh;
      }
      `
    ];
  }

  render() {
    return html`
      <converter-el></converter-el>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
