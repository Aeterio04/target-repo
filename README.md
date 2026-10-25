# kawach-demo-shop

A deliberately simple demo shop for testing automated QA and bug-fix tools.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm run dev
```

Visit http://localhost:3000

## Test

```bash
npm test
```

## Known Issues

If you encounter issues with coupon codes not applying correctly, please verify that the Apply button triggers the price recalculation properly.
