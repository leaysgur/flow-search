# flow-search

Search Flow's builtin type declarations from your console.

## Install
```sh
npm install -g flow-search
```

## Usage
```sh
# fetch and stdout all builtin decls of master branch
flow-search

# fetch and stdout all builtin decls of v0.39 branch
flow-search -b v0.39

# fetch and stdout specified builtin decls of master branch
flow-search -d react

# fetch and stdout specified builtin decls of v0.40 branch
flow-search -d react -b v0.40
```

Original declaretions are https://github.com/facebook/flow/tree/master/lib
