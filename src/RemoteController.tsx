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

/** The globally exposed library MDL exposes as `window['componentHandler']` */
declare var componentHandler: any;

/** The globally exposed firebase library */
declare var firebase: any;

class RemoteController {

  /**
   * Initializes a new instance of RemoteController.
   * @private
   * @static
   * @return {Remote} A new instance of RemoteController.
   */
  private static _sharedInstance = new RemoteController();

  remixer: remixer = remixer.attachedInstance;
  variables: Variable[] = [];

  /**
   * [config description]
   * @type {Object}
   */
  static start(config: {}): void {
    this._sharedInstance.dbReference().on("value", (data: any) => {
      this._sharedInstance.syncData(data.val());
    });
  }

  /**
   * [data description]
   * @type {[type]}
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
   * Returns a database reference to the remixer instance.
   * @private
   * @return {firebase.database.Reference} The firebase database reference.
   */
  private dbReference(): any {
    return firebase.database().ref(`remixer/${this.getUrlParam("id")}`);
  }

  /**
   * [key description]
   * @type {[type]}
   */
  private getUrlParam(key: string): string {
      let regex = new RegExp(`[\\?&]${key}=([^&#]*)`);
      let results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  /**
   * [variable description]
   * @type {[type]}
   */
  private updateVariable(variable: Variable, selectedValue: any): void {
    if (variable.selectedValue !== selectedValue) {
      variable.selectedValue = selectedValue;
      this.dbReference().child(variable.key).set(variable.serialize());
    }
  }

  /**
   *
   */
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
