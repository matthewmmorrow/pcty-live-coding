## Details
By Matthew Morrow on 2024-01-05

## Getting Started

Install node packages and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design
### UI
- Main component: Beneficiary - 
- App: 

### API
- api/benefits/health/beneficiary - GET - (also includes employee salary but ideally that should be from somewhere else)
- api/benefits/health/beneficiary/[id] - PUT - saves the beneficiary at the given id

### Model
- Beneficiary - Contains details about the beneficiary, including the type (employee, spouse, child)
  - Flat array structure can be saved easily in a beneficiary table

### Improvements
- Move buttons to own component for styling
- Use authentication and employee id to validate requests