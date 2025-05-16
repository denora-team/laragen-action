# Laragen Action

Generates Laravel API docs and uploads them to Laragen.dev.

## Inputs

- `api_key` (required): Your Laragen.dev API key.
- `project_slug` (required): The slug under which to publish (e.g. `org/repo`).
- `branch` (optional): Branch name (defaults to the GitHub ref).

## Example Workflow

```yaml
name: Publish API Docs

on:
  push:
    branches: [ main ]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish to Laragen
        uses: laragen/laragen-action@v1
        with:
          api_key: ${{ secrets.LARAGEN_API_KEY }}
          project_slug: some-organization/testing-project
