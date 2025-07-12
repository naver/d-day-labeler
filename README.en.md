# d-day-labeler

🌏 [**한국어**](README.md) | English

GitHub Actions to automatically update labels based on the D-n rule

## D-n rule

It's a way to indicate the code review deadline on a PR using a D-n format label, helping reviewers prioritize and work more efficiently.

- If a review needs to be completed within 3 days, add a `D-3` label to the PR.
- For urgent updates, use the `D-0` label to signal that an immediate review is needed.

`D-n` labels need to be updated daily. `d-day-labeler` automates that process.

## Usage

1. Create a `.github/workflows/d-day-labeler.yml` file:

```yml
name: Update D-n Labels
on:
  schedule:
    - cron: '0 15 * * *' # Runs daily at midnight (KST)
jobs:
  d-day-labeler:
    runs-on: [ubuntu-latest]
    steps:
      - name: Update D-n Labels
        uses: naver/d-day-labeler@latest
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          skipDraft: true # Set to true to skip draft PRs (optional)
```

2. Add a `D-n` label (e.g., `D-5`, `D-3`) to a PR.
3. `d-day-labeler` will automatically update the label daily.

## Inputs

### `token`

**Required** GitHub token

### `skipDraft`

**Optional** Determines whether to skip draft PRs when updating labels. Default: `false`

## License
```
Copyright (c) 2023-present NAVER Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
