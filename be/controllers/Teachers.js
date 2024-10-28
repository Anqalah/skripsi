export const getTeachers = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        include: [{ model: Users }],
      });
    } else {
      response = await Products.findAll({
        where: {
          userId: req.userId,
        },
        include: [{ model: Users }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getTeacherById = async (req, res) => {};
export const createTeacher = async (req, res) => {};
export const updateTeacher = async (req, res) => {};
export const deleteTeacher = async (req, res) => {};
