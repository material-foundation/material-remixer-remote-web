/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import "../node_modules/material-remixer/src/ui/styles/overlay.less";

import { remixer } from "../node_modules/material-remixer/src/core/Remixer";
import { ConstraintType, DataType } from "../node_modules/material-remixer/src/lib/Constants";
import { LocalStorage } from "../node_modules/material-remixer/src/lib/LocalStorage";
import { OverlayController } from "../node_modules/material-remixer/src/ui/OverlayController";
import { Variable } from "../node_modules/material-remixer/src/core/variables/Variable";

/** The globally exposed library MDL exposes as `window['componentHandler']`. */
declare var componentHandler: any;

/** The globally exposed firebase library. */
declare var firebase: any;

/**
 * The RemoteController class is a singleton class that keeps displays of all
 * the Remixer Variables and deals with saving/syncing its values.
 * @class
 */
class RemoteController {

  /**
   * Initializes a new instance of RemoteController.
   * @private
   * @static
   * @return {Remote} A new instance of RemoteController.
   */
  private static _sharedInstance = new RemoteController();

  /**
   * Intializes an instance of Remixer.
   * @private
   */
  private remixer: remixer = remixer.attachedInstance;

  /**
   * The array of remixer variables.
   * @private
   * @type {Variable[]]}
   */
  private variables: Variable[] = [];

  /**
   * The firebase database reference.
   * @private
   */
  private dbReference: any;

  /**
   * Starts the remote controller.
   * @static
   */
  static start(): void {
    let instance = this._sharedInstance;
    let remoteId = instance.getUrlParam("id");
    instance.dbReference = firebase.database().ref(`remixer/${remoteId}`);
    instance.dbReference.on("value", (data: any) => {
      instance.syncData(data.val());
    });
  }

  /**
   * Syncs the data provided from firebase instance to remixer variables.
   * @private
   * @param {any} data The raw data received from firebase.
   */
   private syncData(data: any): void {
     this.variables = [];
     for (let key in data) {
       let variable = LocalStorage.deserialize(data[key]);
       if (variable instanceof Variable) {
         this.variables.push(variable);
       }
     }
     this.redraw();
   }

  /**
   * Parses the current `window.location` and returns the query search value
   * for given key.
   * @private
   * @param {string} key The key of the query value to return.
   * @return {string} The query value.
   */
   private getUrlParam(key: string): string {
     let regex = new RegExp(`[\\?&]${key}=([^&#]*)`);
     let results = regex.exec(location.search);
     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
   }

  /**
   * Handles all control updates by setting the value on the firebase instance.
   *
   * To maintain immutability for React, an update here will trigger a new call
   * to the `syncData` method which regnerates the array of avariables entirely.
   * Doing so allows each control to handle its own `shouldComponentUpdate`
   * method to determine if it should be re-rendered.
   *
   * @param {Variable} variable The variable to update.
   * @param {any} selectedValue The new selected value.
   */
  private updateVariable(variable: Variable, selectedValue: any): void {
    if (variable.selectedValue !== selectedValue) {
      variable.selectedValue = selectedValue;
      this.dbReference.child(variable.key).set(variable.serialize());
    }
  }

  /** Renders the OverlayController component to the DOM. */
   private redraw(): void {
     const overlayWrapper = document.getElementById("remixer-remote");
       ReactDOM.render(
         <OverlayController
           wrapperElement={overlayWrapper}
           variables={this.variables}
           updateVariable={this.updateVariable.bind(this)}
         />,
         overlayWrapper,
       );

       // Upgrade all registered MDL components that have been created dynamically.
       componentHandler.upgradeAllRegistered();
   }
 }

export { RemoteController as remoteController };
