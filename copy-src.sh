#!/usr/bin/env bash

copyFiles -f \
  node_modules/material-design-lite/material.min.{css,js,*.map} \
  node_modules/material-remixer/dist/remixer.min.{js,*.map} \
  src/* \
  public

echo "=== Source files have been copied to: ./public ==="
