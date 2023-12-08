#!/bin/sh

ACCOUNT_ID=$1

NEAR_ENV=mainnet near deploy $ACCOUNT_ID --wasmFile ./target/wasm32-unknown-unknown/release/blockraise.wasm
