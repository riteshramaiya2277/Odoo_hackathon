const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key-keep-it-safe-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Path to db directory
const dbDir = path.join(__dirname, '..', 'db');

// Helper function to read JSON files
const readJSONFile = (filename) => {
  const filePath = path.join(dbDir, filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

// Demo page HTML
const demoPageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TransitOps Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }
        h2 {
            color: #444;
            margin: 30px 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #007bff;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #007bff;
            color: white;
            font-weight: bold;
        }
        tr:hover {
            background-color: #f0f8ff;
        }
        .status-available { color: #28a745; font-weight: bold; }
        .status-on-trip { color: #ffc107; font-weight: bold; }
        .status-in-shop { color: #dc3545; font-weight: bold; }
        .status-suspended { color: #dc3545; font-weight: bold; }
        .status-completed { color: #28a745; font-weight: bold; }
        .status-dispatched { color: #007bff; font-weight: bold; }
        .status-active { color: #ffc107; font-weight: bold; }
    </style>
</head>
<body>
    <h1>TransitOps Demo Dashboard</h1>
    
    <h2>Users</h2>
    <table id="usersTable"></table>
    
    <h2>Vehicles</h2>
    <table id="vehiclesTable"></table>
    
    <h2>Drivers</h2>
    <table id="driversTable"></table>
    
    <h2>Trips</h2>
    <table id="tripsTable"></table>
    
    <h2>Maintenances</h2>
    <table id="maintenancesTable"></table>
    
    <h2>Fuel Logs</h2>
    <table id="fuelLogsTable"></table>
    
    <h2>Expenses</h2>
    <table id="expensesTable"></table>

    <script>
        // Helper to get status class
        function getStatusClass(status) {
            if (!status) return '';
            return 'status-' + status.toLowerCase().replace(/ /g, '-');
        }

        // Render table
        function renderTable(tableId, data, columns) {
            const table = document.getElementById(tableId);
            let html = '<thead><tr>';
            columns.forEach(col => {
                html += '<th>' + col.label + '</th>';
            });
            html += '</tr></thead><tbody>';
            
            data.forEach(row => {
                html += '<tr>';
                columns.forEach(col => {
                    const value = row[col.key];
                    if (col.key.includes('status') || col.key === 'tripStatus') {
                        html += '<td class="' + getStatusClass(value) + '">' + (value || '-') + '</td>';
                    } else {
                        html += '<td>' + (value || '-') + '</td>';
                    }
                });
                html += '</tr>';
            });
            html += '</tbody>';
            table.innerHTML = html;
        }

        // Fetch and render all data
        async function loadData() {
            try {
                // Users
                const usersRes = await fetch('/api/users');
                const users = await usersRes.json();
                renderTable('usersTable', users, [
                    { key: 'fullName', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'isActive', label: 'Active' }
                ]);

                // Vehicles
                const vehiclesRes = await fetch('/api/vehicles');
                const vehicles = await vehiclesRes.json();
                renderTable('vehiclesTable', vehicles, [
                    { key: 'registrationNumber', label: 'Reg Number' },
                    { key: 'vehicleName', label: 'Name' },
                    { key: 'vehicleType', label: 'Type' },
                    { key: 'maxLoadCapacity', label: 'Max Load' },
                    { key: 'odometer', label: 'Odometer' },
                    { key: 'region', label: 'Region' },
                    { key: 'status', label: 'Status' }
                ]);

                // Drivers
                const driversRes = await fetch('/api/drivers');
                const drivers = await driversRes.json();
                renderTable('driversTable', drivers, [
                    { key: 'name', label: 'Name' },
                    { key: 'licenseNumber', label: 'License' },
                    { key: 'licenseCategory', label: 'Category' },
                    { key: 'licenseExpiryDate', label: 'Expiry' },
                    { key: 'contactNumber', label: 'Contact' },
                    { key: 'safetyScore', label: 'Safety Score' },
                    { key: 'status', label: 'Status' }
                ]);

                // Trips
                const tripsRes = await fetch('/api/trips');
                const trips = await tripsRes.json();
                renderTable('tripsTable', trips, [
                    { key: 'source', label: 'Source' },
                    { key: 'destination', label: 'Destination' },
                    { key: 'cargoWeight', label: 'Cargo Weight' },
                    { key: 'plannedDistance', label: 'Planned Distance' },
                    { key: 'actualDistance', label: 'Actual Distance' },
                    { key: 'tripStatus', label: 'Status' },
                    { key: 'remarks', label: 'Remarks' }
                ]);

                // Maintenances
                const maintenancesRes = await fetch('/api/maintenances');
                const maintenances = await maintenancesRes.json();
                renderTable('maintenancesTable', maintenances, [
                    { key: 'maintenanceType', label: 'Type' },
                    { key: 'description', label: 'Description' },
                    { key: 'maintenanceCost', label: 'Cost' },
                    { key: 'startDate', label: 'Start Date' },
                    { key: 'endDate', label: 'End Date' },
                    { key: 'status', label: 'Status' }
                ]);

                // Fuel Logs
                const fuelLogsRes = await fetch('/api/fuelLogs');
                const fuelLogs = await fuelLogsRes.json();
                renderTable('fuelLogsTable', fuelLogs, [
                    { key: 'liters', label: 'Liters' },
                    { key: 'cost', label: 'Cost' },
                    { key: 'date', label: 'Date' },
                    { key: 'odometerReading', label: 'Odometer' }
                ]);

                // Expenses
                const expensesRes = await fetch('/api/expenses');
                const expenses = await expensesRes.json();
                renderTable('expensesTable', expenses, [
                    { key: 'expenseType', label: 'Type' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'description', label: 'Description' },
                    { key: 'expenseDate', label: 'Date' }
                ]);
            } catch (err) {
                console.error('Error loading data:', err);
            }
        }

        // Load data on page load
        loadData();
    </script>
</body>
</html>
`;

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readJSONFile('users.json');

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json(null);
  }
});

// Test user page
app.get('/test-user', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-user.html'));
});

// Root endpoint serves demo page
app.get('/', (req, res) => {
  res.send(demoPageHTML);
});

// API endpoints for all collections
app.get('/api/users', (req, res) => {
  const users = readJSONFile('users.json');
  res.json(users);
});

app.get('/api/vehicles', (req, res) => {
  const vehicles = readJSONFile('vehicles.json');
  res.json(vehicles);
});

app.get('/api/drivers', (req, res) => {
  const drivers = readJSONFile('drivers.json');
  res.json(drivers);
});

app.get('/api/trips', (req, res) => {
  const trips = readJSONFile('trips.json');
  res.json(trips);
});

app.get('/api/maintenances', (req, res) => {
  const maintenances = readJSONFile('maintenances.json');
  res.json(maintenances);
});

app.get('/api/fuelLogs', (req, res) => {
  const fuelLogs = readJSONFile('fuelLogs.json');
  res.json(fuelLogs);
});

app.get('/api/expenses', (req, res) => {
  const expenses = readJSONFile('expenses.json');
  res.json(expenses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
