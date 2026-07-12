const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const Driver = require('./models/Driver');
const Trip = require('./models/Trip');
const MaintenanceLog = require('./models/MaintenanceLog');
const User = require('./models/User');
const Role = require('./models/Role');
const Expense = require('./models/Expense');
const FuelLog = require('./models/FuelLog');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding');

    // Clear existing data
    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Trip.deleteMany({});
    await MaintenanceLog.deleteMany({});
    await User.deleteMany({});
    await Role.deleteMany({});
    await Expense.deleteMany({});
    await FuelLog.deleteMany({});

    // Create sample roles
    const [adminRole, managerRole, driverRole] = await Role.create([
      { name: 'Admin', permissions: ['all'] },
      { name: 'Manager', permissions: ['read', 'write'] },
      { name: 'Driver', permissions: ['read'] }
    ]);

    // Create demo users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@transitops.com',
        password: 'password123',
        role: adminRole._id,
        phone: '+1 234 567 8900',
        status: 'active'
      },
      {
        name: 'Fleet Manager',
        email: 'manager@transitops.com',
        password: 'password123',
        role: managerRole._id,
        phone: '+1 234 567 8901',
        status: 'active'
      },
      {
        name: 'Test Driver',
        email: 'driver@transitops.com',
        password: 'password123',
        role: driverRole._id,
        phone: '+1 234 567 8902',
        status: 'active'
      }
    ]);

    const user = users[0];

    // Create sample drivers
    const drivers = await Driver.create([
      {
        name: 'John Smith',
        licenseNumber: 'LIC123456',
        licenseExpiry: '2026-12-31',
        phone: '+1 234 567 8901',
        experience: 5,
        status: 'On Trip',
        address: '123 Main St, New York, NY'
      },
      {
        name: 'Jane Doe',
        licenseNumber: 'LIC789012',
        licenseExpiry: '2027-06-30',
        phone: '+1 234 567 8902',
        experience: 3,
        status: 'Available',
        address: '456 Oak Ave, Chicago, IL'
      },
      {
        name: 'Bob Johnson',
        licenseNumber: 'LIC345678',
        licenseExpiry: '2026-09-15',
        phone: '+1 234 567 8903',
        experience: 7,
        status: 'On Trip',
        address: '789 Pine Rd, Los Angeles, CA'
      },
      {
        name: 'Alice Williams',
        licenseNumber: 'LIC901234',
        licenseExpiry: '2027-03-20',
        phone: '+1 234 567 8904',
        experience: 2,
        status: 'Available',
        address: '101 Cedar Ln, Seattle, WA'
      },
      {
        name: 'Charlie Brown',
        licenseNumber: 'LIC567890',
        licenseExpiry: '2026-11-05',
        phone: '+1 234 567 8905',
        experience: 4,
        status: 'On Trip',
        address: '202 Maple Dr, Denver, CO'
      },
      {
        name: 'Diana Prince',
        licenseNumber: 'LIC123901',
        licenseExpiry: '2027-08-12',
        phone: '+1 234 567 8906',
        experience: 6,
        status: 'Available',
        address: '303 Birch St, Austin, TX'
      }
    ]);

    // Create sample vehicles
    const vehicles = await Vehicle.create([
      {
        registrationNumber: 'TRK-001',
        vehicleType: 'Truck',
        brand: 'Ford',
        model: 'F-150',
        year: 2020,
        capacityKg: 5000,
        fuelType: 'Diesel',
        odometer: 120000,
        status: 'On Trip',
        insuranceExpiry: '2026-12-31',
        fitnessExpiry: '2026-12-31',
        assignedDriver: drivers[0]._id,
        createdBy: user._id
      },
      {
        registrationNumber: 'TRK-002',
        vehicleType: 'Truck',
        brand: 'Chevrolet',
        model: 'Silverado',
        year: 2021,
        capacityKg: 5500,
        fuelType: 'Diesel',
        odometer: 85000,
        status: 'Available',
        insuranceExpiry: '2027-06-30',
        fitnessExpiry: '2027-06-30',
        assignedDriver: drivers[1]._id,
        createdBy: user._id
      },
      {
        registrationNumber: 'TRK-003',
        vehicleType: 'Truck',
        brand: 'Ram',
        model: '1500',
        year: 2022,
        capacityKg: 6000,
        fuelType: 'Gasoline',
        odometer: 45000,
        status: 'On Trip',
        insuranceExpiry: '2027-09-15',
        fitnessExpiry: '2027-09-15',
        assignedDriver: drivers[2]._id,
        createdBy: user._id
      },
      {
        registrationNumber: 'TRK-004',
        vehicleType: 'Truck',
        brand: 'Ford',
        model: 'F-250',
        year: 2019,
        capacityKg: 7000,
        fuelType: 'Diesel',
        odometer: 150000,
        status: 'In Shop',
        insuranceExpiry: '2026-12-31',
        fitnessExpiry: '2026-12-31',
        createdBy: user._id
      },
      {
        registrationNumber: 'TRK-005',
        vehicleType: 'Truck',
        brand: 'GMC',
        model: 'Sierra',
        year: 2023,
        capacityKg: 6500,
        fuelType: 'Diesel',
        odometer: 25000,
        status: 'Available',
        insuranceExpiry: '2027-03-20',
        fitnessExpiry: '2027-03-20',
        assignedDriver: drivers[3]._id,
        createdBy: user._id
      },
      {
        registrationNumber: 'TRK-006',
        vehicleType: 'Truck',
        brand: 'Toyota',
        model: 'Tundra',
        year: 2022,
        capacityKg: 5200,
        fuelType: 'Gasoline',
        odometer: 60000,
        status: 'On Trip',
        insuranceExpiry: '2026-11-05',
        fitnessExpiry: '2026-11-05',
        assignedDriver: drivers[4]._id,
        createdBy: user._id
      }
    ]);

    // Create sample trips
    await Trip.create([
      {
        tripNumber: 'TRP-1001',
        vehicle: vehicles[0]._id,
        driver: drivers[0]._id,
        source: 'New York, NY',
        destination: 'Boston, MA',
        cargoWeightKg: 4000,
        distanceKm: 300,
        fuelUsed: 50,
        fuelCost: 200,
        tollCost: 30,
        otherExpense: 50,
        operationalCost: 280,
        status: 'Dispatched',
        startDate: new Date().toISOString().split('T')[0]
      },
      {
        tripNumber: 'TRP-1002',
        vehicle: vehicles[1]._id,
        driver: drivers[1]._id,
        source: 'Chicago, IL',
        destination: 'Detroit, MI',
        cargoWeightKg: 3500,
        distanceKm: 280,
        fuelUsed: 45,
        fuelCost: 180,
        tollCost: 25,
        otherExpense: 30,
        operationalCost: 235,
        status: 'Draft',
        startDate: new Date().toISOString().split('T')[0]
      },
      {
        tripNumber: 'TRP-1003',
        vehicle: vehicles[2]._id,
        driver: drivers[2]._id,
        source: 'Los Angeles, CA',
        destination: 'San Diego, CA',
        cargoWeightKg: 4500,
        distanceKm: 190,
        fuelUsed: 30,
        fuelCost: 120,
        tollCost: 15,
        otherExpense: 20,
        operationalCost: 155,
        status: 'Dispatched',
        startDate: new Date().toISOString().split('T')[0]
      },
      {
        tripNumber: 'TRP-1004',
        vehicle: vehicles[4]._id,
        driver: drivers[3]._id,
        source: 'Seattle, WA',
        destination: 'Portland, OR',
        cargoWeightKg: 3800,
        distanceKm: 280,
        fuelUsed: 48,
        fuelCost: 192,
        tollCost: 28,
        otherExpense: 35,
        operationalCost: 255,
        status: 'Completed',
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        tripNumber: 'TRP-1005',
        vehicle: vehicles[5]._id,
        driver: drivers[4]._id,
        source: 'Denver, CO',
        destination: 'Phoenix, AZ',
        cargoWeightKg: 4200,
        distanceKm: 880,
        fuelUsed: 120,
        fuelCost: 480,
        tollCost: 60,
        otherExpense: 80,
        operationalCost: 620,
        status: 'Dispatched',
        startDate: new Date().toISOString().split('T')[0]
      }
    ]);

    // Create sample maintenance logs
    await MaintenanceLog.create([
      {
        vehicle: vehicles[3]._id,
        maintenanceType: 'Repair',
        description: 'Transmission repair',
        cost: 2500,
        serviceCenter: 'AutoCare Plus',
        status: 'In Progress',
        maintenanceDate: new Date().toISOString().split('T')[0],
        expectedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        vehicle: vehicles[0]._id,
        maintenanceType: 'Routine',
        description: 'Oil change and inspection',
        cost: 150,
        serviceCenter: 'QuickLube',
        status: 'Completed',
        maintenanceDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        expectedCompletion: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ]);

    // Get the created trips for expenses/fuel logs
    const trips = await Trip.find();

    // Create sample fuel logs
    await FuelLog.create([
      {
        vehicle: vehicles[0]._id,
        trip: trips[0]._id,
        fuelQuantity: 50,
        fuelPricePerLiter: 4.00,
        totalCost: 200,
        fuelStation: 'Shell Station',
        filledBy: user._id,
        date: new Date().toISOString().split('T')[0]
      },
      {
        vehicle: vehicles[2]._id,
        trip: trips[2]._id,
        fuelQuantity: 30,
        fuelPricePerLiter: 4.00,
        totalCost: 120,
        fuelStation: 'Exxon',
        filledBy: user._id,
        date: new Date().toISOString().split('T')[0]
      },
      {
        vehicle: vehicles[4]._id,
        trip: trips[3]._id,
        fuelQuantity: 48,
        fuelPricePerLiter: 4.00,
        totalCost: 192,
        fuelStation: 'Chevron',
        filledBy: user._id,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ]);

    // Create sample expenses
    await Expense.create([
      {
        trip: trips[0]._id,
        vehicle: vehicles[0]._id,
        expenseType: 'Tolls',
        amount: 30,
        description: 'Highway tolls',
        createdBy: user._id,
        date: new Date().toISOString().split('T')[0]
      },
      {
        trip: trips[0]._id,
        vehicle: vehicles[0]._id,
        expenseType: 'Food',
        amount: 50,
        description: 'Driver meal',
        createdBy: user._id,
        date: new Date().toISOString().split('T')[0]
      },
      {
        trip: trips[2]._id,
        vehicle: vehicles[2]._id,
        expenseType: 'Tolls',
        amount: 15,
        description: 'Highway tolls',
        createdBy: user._id,
        date: new Date().toISOString().split('T')[0]
      }
    ]);

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
