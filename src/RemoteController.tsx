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

import "file-loader?name=[name].[ext]!./index.html";
import "file-loader?name=[name].[ext]!./styles.css";
import "file-loader?name=[name].[ext]!./remixer.svg";
import "./styles.css";
import "../node_modules/material-remixer/src/ui/styles/overlay.less";

import { remixer } from "../node_modules/material-remixer/src/core/Remixer";
import { BooleanVariable } from "../node_modules/material-remixer/src/core/variables/BooleanVariable";
import { ColorVariable } from "../node_modules/material-remixer/src/core/variables/ColorVariable";
import { ConstraintType, DataType } from "../node_modules/material-remixer/src/lib/Constants";
import { NumberVariable } from "../node_modules/material-remixer/src/core/variables/NumberVariable";
import { OverlayController } from "../node_modules/material-remixer/src/ui/OverlayController";
import { RangeVariable } from "../node_modules/material-remixer/src/core/variables/RangeVariable";
import { StringVariable } from "../node_modules/material-remixer/src/core/variables/StringVariable";
import { Variable } from "../node_modules/material-remixer/src/core/variables/Variable";

// const overlayWrapper = document.getElementById("remixer-remote");
// let remixer: remixer = remixer.attachedInstance;
// let variables: {[key: string]: Variable} = {};
let variables: Variable[] = [];

class RemoteController {

  private remixer: remixer = remixer.attachedInstance;

  // private static variables: {[key: string]: Variable} = {};
  // private static variables: Variable[] = [];

  static sync(data: any): void {

    let variable = this.deserialize(data);
    if (variable) {
      variables.push(variable);
      // this.variables[variable.key] = variable;
    }

    redraw();
  }

  private static deserialize(data: any): Variable {
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

  // private static get variablesArray(): Variable[] {
  //   return Object.keys(this.variables).map((key) => this.variables[key]);
  // }
  //
  // static updateVariable(variable: Variable, selectedValue: any): void {
  //   console.log("updateVariable");
  //   // remixer.cloneAndUpdateVariable(variable, selectedValue);
  // }
  //
  // static redraw() {
  //   ReactDOM.render(
  //     <OverlayController
  //       wrapperElement={overlayWrapper}
  //       variables={this.variablesArray}
  //       updateVariable={this.updateVariable}
  //     />,
  //     overlayWrapper,
  //   );
  // }


}

function updateVariable(variable: Variable, selectedValue: any): void {
  // remixer.cloneAndUpdateVariable(variable, selectedValue);
}

// Renders the OverlayController component to the overlay wrapper element.
const overlayWrapper = document.getElementById("remixer-remote");
function redraw(): void {
  // variables = remixer.attachedInstance.variablesArray;

  ReactDOM.render(
    <OverlayController
      wrapperElement={overlayWrapper}
      variables={variables}
      updateVariable={updateVariable}
    />,
    overlayWrapper,
  );
}

// Add `redraw()` as a callback when selected value changes on a variable.
variables.forEach((variable) => {
  variable.addCallback(redraw);
});

redraw();

export { RemoteController as remoteController };
