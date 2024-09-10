const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const errors = [];

  // Validate firstname
  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  } else if (firstname.length >= 255) {
    errors.push({
      field: "firstname",
      message: "Should contain less than 255 characters",
    });
  }

  // Validate lastname
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  } else if (lastname.length >= 255) {
    errors.push({
      field: "lastname",
      message: "Should contain less than 255 characters",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email == null) {
    errors.push({ field: "email", message: "This field is required" });
  } else if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "This field should be a valid email address",
    });
  }

  // Validate city
  if (city == null) {
    errors.push({ field: "city", message: "This field is required" });
  } else if (city.length >= 255) {
    errors.push({
      field: "city",
      message: "Should contain less than 255 characters",
    });
  }

  // Validate language
  if (language == null) {
    errors.push({ field: "language", message: "This field is required" });
  }

  // Check if there are any validation errors
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next(); // Pass control to the next middleware
  }
};

module.exports = validateUser;
