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
- Main component: Beneficiary - Handles displaying and editing one beneficiary. Saving and removing actions are propogated to the parent
- App - Handles fetching data, building Beneficiary components and displaying paycheck information

### API
- api/benefits/health/beneficiary - GET - Retrieves list of  (also includes employee salary but ideally that should be from somewhere else)
- api/benefits/health/beneficiary/[id] - PUT - saves the beneficiary at the given id

### Model
- Beneficiary - Contains details about the beneficiary, including the type (employee, spouse, child)
  - Flat array structure can be saved easily in a beneficiary table

### External libraries
- uuid - For generating a unique id for mock data

### Improvements
- Move buttons to own component for styling
- Use authentication and employee id to validate requests
- Create a paycheck component since that could get complex
- In a system with more benefits, a better approach would be to store the beneficiaries and only link them to different benefits, i.e. these health benefits apply to these dependent that are defined elsewhere.
- Unit testing/automated UI testing
- Re-calculate deductions on server-side for the UI. The UI can instantly change the number to a preliminary calculated value but the server should provide the authoritative calculation