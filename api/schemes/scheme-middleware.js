const db = require("./../../data/db-config");

const checkSchemeId = async (req, res, next) => {
  try {
    const existingID = await db("schemes")
      .where("scheme_id", req.params.scheme_id)
      .first();
    if (!existingID) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (!scheme_name || typeof scheme_name !== "string" || !scheme_name.trim()) {
    next({
      status: 400,
      message: "invalid scheme_name",
    });
  } else {
    next();
  }
};

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    !instructions ||
    typeof instructions !== "string" ||
    !instructions.trim() ||
    typeof step_number !== "number" ||
    step_number < 1
  ) {
    next({
      status: 400,
      message: "invalid step",
    });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
