requirements:
nodejs, angular cli, node package manager

steps to run application:
Run 'npm i' to install dependencies
Run 'npm run api' to start json server in a seperate terminal
Run 'ng serve' for a dev server. Navigate to 'http://localhost:4200/' to view application

assumptions:
the supplier invoice number is assumed to be an alphanumeric field
complete order button only enables when the order detail form is valid, there is atleast one product selected and either payment option is set as pay now and a value is given or it is set to pay later
by default no tax is selected as the tax code for any selected product
by default payment method is selected as cash
only the order placement view has been developed