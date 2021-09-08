const db = require("../../data/db-config");

// Exercise A
function find() {
  return db({ sc: "schemes" })
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.*")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id");
}

// Exercise B
async function findById(scheme_id) {
  const results = await db({ sc: "schemes" })
    .leftJoin({ st: "steps" }, "st.scheme_id", "sc.scheme_id")
    .orderBy("st.step_number", "asc")
    .where("sc.scheme_id", scheme_id)
    .select("sc.*", "st.*");

  const id = results[0].scheme_id;
  const name = results[0].scheme_name;

  const scheme = {
    scheme_id: id ? id : scheme_id,
    scheme_name: name,
    steps: [],
  };

  if (results[0].step_id) {
    scheme.steps = results.map((scheme) => {
      return {
        step_id: scheme.step_id,
        step_number: scheme.step_number,
        instructions: scheme.instructions,
      };
    });
  }

  return scheme;
}

// Exercise C
function findSteps(scheme_id) {
  return db({ st: "steps" })
    .leftJoin({ sc: "schemes" }, "sc.scheme_id", "st.scheme_id")
    .where("st.scheme_id", scheme_id)
    .select("st.step_id", "st.step_number", "st.instructions", "sc.scheme_name")
    .orderBy("st.step_number", "asc");
}

// Exercise D
async function add(scheme) {
  const [id] = await db("schemes").insert({ scheme_name: scheme.scheme_name });

  return findById(id);
}

// Exercise E
async function addStep(scheme_id, step) {
  const newStep = await db("steps").insert({
    scheme_id: scheme_id,
    step_number: step.step_number,
    instructions: step.instructions,
  });
  return findById;
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
