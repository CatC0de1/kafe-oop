class Discount {
  apply(order) {
    throw new Error("Method 'apply()' must be implemented in subclass");
  }

  getMessage() {
    throw new Error("Method 'getMessage()' must be implemented in subclass");
  }
}

module.exports = Discount;
