/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the elements needed by this element.
import { removeFromCartIcon } from './my-icons.js';

const mile_in_k = 1.60934;

class Converter extends connect(store)(LitElement) {
  constructor() {
    super();
    this.minutes_ = 0;
    this.seconds_ = 0;
  }

  static get properties() {
    return {
      converted_pace_: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .pace-container {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      <h2>Start converting</h2>

      <form action="">
        <div class="pace-container">
          Pace minutes/miles:
          <label>
            Minutes
            <input
              type="text"
              type="number"
              .value=${this.minutes_}
              @input=${e => this._convert_pace({minutes: e.target.value})}/>
          </label>
          <label>
            seconds
            <input
              type="text"
              type="number"
              .value=${this.seconds_}
              @input=${e => this._convert_pace({seconds: e.target.value})}/>
          </label>
        </div>
        <div class="pace-container">
          Pace minutes/k:
          <label>
            Minutes
            <input
              type="text"
              type="number"
              .value=${this.minutes_}
              @input=${e => this._convert_pace({minutes: e.target.value})}/>
          </label>
          <label>
            seconds
            <input
              type="text"
              type="number"
              .value=${this.seconds_}
              @input=${e => this._convert_pace({seconds: e.target.value})}/>
          </label>
        </div>
        <div class="pace-container">
          Pace Km/h:
          <label>
            km/h
            <input
              type="text"
              type="number"
              .value=${this.minutes_}
              @input=${e => this._convert_pace({minutes: e.target.value})}/>
          </label>
        </div>

      </form>




      Result:
      <p>${this.converted_pace_}</p>

    `;
  }

  _convert_pace({minutes, seconds}) {
    this.minutes_ = minutes ? minutes: this.minutes_;
    this.seconds_ = seconds ? seconds: this.seconds_;

    const decimal_pace = parseInt(this.minutes_) + this.seconds_ / 60;
    const converted_pace_ = decimal_pace / mile_in_k
    const converted_seconds = Math.round((converted_pace_ % 1) * 60)

    this.converted_pace_ = `${Math.floor(converted_pace_)}:${converted_seconds}` ;
  }

}

window.customElements.define('converter-el', Converter);
