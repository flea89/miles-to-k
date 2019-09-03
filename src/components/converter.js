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
import { colors } from './shared-styles';

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

    // expressed in km/h
    this.pace = 0.00;
  }

  static get properties() {
    return {
      converted_pace_: { type: String },
      pace: {type: Number}
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          color: ${colors.white};
        }

        h2 {
          color: #12355B;
          text-align: center;

        }

        form {
          flex: 1;
          display:flex;
          flex-direction: column;
        }

        input[type="number"] {
          -webkit-appearance: none;
          border: 0;
          background: none;
          border-bottom: 1px solid white;
          color: white;
          font-size: 40px;
          width: 2em;
          text-align: center;
        }

        input[type="number"].kmh {
          width: 3em;
        }

        label {
          display: flex;
          flex-direction: column;
          margin: 0 10px;
          text-align: center;
          position: relative;
        }

        .pace-header {

        }

        .pace-header__pace {
          display: inline-block;
          font-size: 12px;
        }

        .pace-header__units {
          display: inline-block;
          font-size: 30px;
        }

        .pace-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 30px;

        }

        .pace-value {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pace-value label + label:before {
          content: ":";
          position: absolute;
          font-size: 35px;
          bottom: 0;
          left: -15px;
        }

        .pace-container:nth-child(1) {
          background-color: #0065A4;
        }
        .pace-container:nth-child(2) {
          background-color: #C6373C;
        }
        .pace-container:nth-child(3) {
          background-color: #12355B;
        }
      `
    ];
  }

  render() {
    return html`
      <h2>Pace converter</h2>
      <form action="">
        <div class="pace-container">
          <div class="pace-header">
            <div class="pace-header__pace">
              pace
            </div>
            <div class="pace-header__units">
              minutes/miles
            </div>
          </div>
          <div class="pace-value">
            <label>
              Minutes
              <input
                type="number"
                .value=${this._pace_to_m_minutes(this.pace)}
                @input=${e => this._set_pace_from_miles({minutes: e.target.value})}/>
            </label>
            <label>
              seconds
              <input
                type="number"
                min="0"
                max:"60"
                .value="${this._pace_to_m_seconds(this.pace)}"
                @input=${e => this._set_pace_from_miles({seconds: e.target.value})}/>
            </label>
          </div>
        </div>
        <div class="pace-container">
          <div class="pace-header">
            <div class="pace-header__pace">
              pace
            </div>
            <div class="pace-header__units">
              minutes/km
            </div>
          </div>
          <div class="pace-value">
            <label>
              Minutes
              <input
                type="number"
                .value="${this._pace_to_km_minutes(this.pace)}"
                @input=${e => this._set_pace_from_k({minutes: e.target.value})}/>
            </label>
            <label>
              seconds
              <input
                type="number"
                min="0"
                max:"60"
                .value=${this._pace_to_km_seconds(this.pace)}
                @input=${e => this._set_pace_from_k({seconds: e.target.value})}/>
            </label>
          </div>
        </div>
        <div class="pace-container">
          <div class="pace-header">
            <div class="pace-header__pace">
              pace
            </div>
            <div class="pace-header__units">
              km/h
            </div>
          </div>
          <div class="pace-value">
            <label>
              <input
                type="number"
                class="kmh"
                .value=${this.pace}
                @input=${e => this._set_pace_from_kmh(parseFloat(e.target.value))}/>
            </label>
          </div>
        </div>

      </form>
    `;
  }


  _set_pace_from_miles({minutes, seconds}) {
    const minutes_ = minutes ? minutes: this._pace_to_m_minutes(this.pace);
    const seconds_ = seconds ? seconds: this._pace_to_m_seconds(this.pace);

    const decimal_pace = parseInt(minutes_) + seconds_ / 60;
    this._set_pace_from_kmh(60 / decimal_pace * mile_in_k);

  }

  _set_pace_from_k({minutes, seconds}) {
    const minutes_ = minutes ? minutes: this._pace_to_km_minutes(this.pace);
    const seconds_ = seconds ? seconds: this._pace_to_km_seconds(this.pace);

    const decimal_pace = parseInt(minutes_) + seconds_ / 60;
    this._set_pace_from_kmh(60 / decimal_pace);
  }


  _set_pace_from_kmh(kmh) {
    this.pace = Math.round(kmh* 100) / 100;
  }


  _pace_to_km_minutes(pace) {
    return this._format_2_digits_int( Math.floor(60/pace));
  }

  _pace_to_km_seconds(pace) {
    return this._format_2_digits_int((60 / pace) % 1 * 60);
  }


  _pace_to_m_minutes(pace) {
    return this._format_2_digits_int( Math.floor(60/pace * mile_in_k));
  }

  _pace_to_m_seconds(pace) {
    return this._format_2_digits_int((60 / pace * mile_in_k) % 1 * 60);
  }

  _format_2_digits_int(num) {
    console.log(num)
    if (!isFinite(num)) {
      return '00';
    }
    return `0${Math.round(num)}`.slice(-2);
  }

  _convert_pace({minutes, seconds}) {
  //   this.minutes_ = minutes ? minutes: this.minutes_;
  //   this.seconds_ = seconds ? seconds: this.seconds_;

  //   const decimal_pace = parseInt(this.minutes_) + this.seconds_ / 60;
  //   const converted_pace_ = decimal_pace / mile_in_k
  //   const converted_seconds = Math.round((converted_pace_ % 1) * 60)

  //   this.converted_pace_ = `${Math.floor(converted_pace_)}:${converted_seconds}` ;
  }

}

window.customElements.define('converter-el', Converter);
