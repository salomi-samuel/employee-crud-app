const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const { name, email, department, salary } = req.body;
  const emp = new Employee({ name, email, department, salary });
  await emp.save();
  res.status(201).json(emp);
};

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!emp) return res.status(404).json({ error: "Not found" });
  res.json(emp);
};

exports.deleteEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted" });
};
