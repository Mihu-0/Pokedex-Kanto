function validateId(req, res, next) {
  const { id } = req.params;
  const idNumber = Number(id);

  if (!Number.isInteger(idNumber) || idNumber < 1) {
    return res.status(400).json({
      message: "El id debe ser un número entero positivo",
    });
  }

  req.idNumber = idNumber;

  next();
}

module.exports = validateId;