# d-day-labeler

🌏 한국어 | [**English**](README.en.md)

D-n 규칙에 따라 자동으로 Label 을 업데이트하는 Github Actions

## D-n 룰이란?

코드 리뷰가 완료되어야 하는 시점을 D-n 형식의 Label 을 PR 에 추가해 표현하는 방식입니다.
이를 통해 리뷰어는 리뷰 우선순위를 쉽게 판단하고 효율적으로 작업할 수 있습니다.

- 3일 이내에 리뷰가 완료되어야 한다면 PR 에 `D-3` Label 을 추가합니다.
- 긴급한 수정 사항이 발생한다면 `D-0` Label 을 사용하여 빠르게 리뷰를 수행하도록 합니다.

이 Label 은 매일 갱신되어야 합니다. 이를 자동화하기 위해 해당 Github Action을 사용할 수 있습니다.

## Usage

1. 아래와 같이 `.github/workflows/d-day-labeler.yml` 파일을 작성합니다:
```yml
name: Update D-n Labels
on:
  schedule:
    - cron: '0 15 * * *' # 매일 밤 12시에 실행 (KST 기준)
jobs:
  d-day-labeler:
    runs-on: [ubuntu-latest]
    steps:
      - name: Update D-n Labels
        uses: naver/d-day-labeler@latest
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

2. 원하는 PR에 D-n (예: D-5, D-3 등) 형식의 Label 을 추가합니다.
3. GitHub Actions가 매일 자동으로 해당 Label 을 업데이트합니다.

## Inputs

### `token`

**Required** GitHub에서 제공하는 토큰

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
