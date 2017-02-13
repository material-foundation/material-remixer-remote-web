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

// import "file-loader?name=[name].[ext]!./index.html";
// import "file-loader?name=[name].[ext]!./styles.css";
// import "file-loader?name=[name].[ext]!./remixer.svg";
// import "./styles.css";
// import "../node_modules/material-remixer/src/ui/styles/overlay.less";

import { remixer } from "../node_modules/material-remixer/src/core/Remixer";
import { BooleanVariable } from "../node_modules/material-remixer/src/core/variables/BooleanVariable";
import { ColorVariable } from "../node_modules/material-remixer/src/core/variables/ColorVariable";
import { ConstraintType, DataType } from "../node_modules/material-remixer/src/lib/Constants";
import { NumberVariable } from "../node_modules/material-remixer/src/core/variables/NumberVariable";
import { OverlayController } from "../node_modules/material-remixer/src/ui/OverlayController";
import { RangeVariable } from "../node_modules/material-remixer/src/core/variables/RangeVariable";
import { StringVariable } from "../node_modules/material-remixer/src/core/variables/StringVariable";
import { Variable } from "../node_modules/material-remixer/src/core/variables/Variable";

const overlayWrapper = document.getElementById("remixer-remote");

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

  static start(config: {}): void {
    this._sharedInstance.dbReference().on("value", (data: any) => {
      this._sharedInstance.syncData(data.val());
    });
  }

  /**
   * Returns a database reference to the remixer instance.
   * @private
   * @return {firebase.database.Reference} The firebase database reference.
   */
  private dbReference(): firebase.database.Reference {
    return firebase.database().ref(`remixer/${this.getUrlParam("id")}`);
  }

  private getUrlParam(key: string): string {
      let regex = new RegExp(`[\\?&]${key}=([^&#]*)`);
      let results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  private syncData(data: any): void {
    this.variables = [];
    for (let key in data) {
      let variable = this.deserialize(data[key]);
      this.variables.push(variable);
    }

    this.redraw();
  }

  private deserialize(data: any): Variable {
    switch (data.dataType) {
      case DataType.BOOLEAN:
        return BooleanVariable.deserialize(data);
      case DataType.COLOR:
        return ColorVariable.deserialize(data);
      case DataType.NUMBER:
        if (data.constraintType === ConstraintType.RANGE) {
          return RangeVariable.deserialize(data);
        }
        return NumberVariable.deserialize(data);
      case DataType.STRING:
        return StringVariable.deserialize(data);
      default:
        return null;
    }
  }

  private updateVariable(variable: Variable, selectedValue: any): void {
    if (variable.selectedValue !== selectedValue) {
      variable.selectedValue = selectedValue;
      this.dbReference().child(variable.key).set(variable.serialize());
    }
  }

  private redraw(): void {
    // Renders the OverlayController component to the overlay wrapper element.
    ReactDOM.render(
      <OverlayController
        wrapperElement={overlayWrapper}
        variables={this.variables}
        updateVariable={this.updateVariable.bind(this)}
      />,
      overlayWrapper,
    );

    // We must upgrade all registered MDL components that have been created
    // dynamically.
    window["componentHandler"].upgradeAllRegistered();
  }
}

export { RemoteController as remoteController };
