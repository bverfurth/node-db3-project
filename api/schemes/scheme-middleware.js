const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  try {
    await db("schemes").where({ scheme_id }).first();
    req.schemeSearch = { scheme_id };
    next();
  } catch {
    res
      .status(404)
      .json({ message: `scheme with scheme ID ${scheme_id} not found` });
  }
};

const validateScheme = (req, res, next) => {
  const newScheme = req.body;

  if (
    !newScheme.scheme_name ||
    newScheme.scheme_name.length === 0 ||
    typeof newScheme.scheme_name !== "string"
  ) {
    res.status(400).json({ message: "invalid scheme_name" });
  } else {
    next();
  }
};

const validateStep = (req, res, next) => {
  const newStep = req.body;
  console.log("This should be the step instructions,", newStep);
  if (
    !newStep.instructions ||
    newStep.instructions.length === 0 ||
    typeof newStep.instructions !== "string"
  ) {
    res.status(400).json({ message: "missing instruction" });
  } else if (
    typeof newStep.step_number !== "number" ||
    newStep.step_number < 1
  ) {
    res.status(400).json({ message: "bad step_number" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
