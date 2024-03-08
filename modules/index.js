let student = {
    name: "BOD",
    age: 20,
    grades: {
        marh: 90,
        histroy: 88
    },
    isPresent: function (name) {
        return this.grades[name];
    },
    add: function (name, grade) {
        console.log(this.isPresent( name));
        this.grades[name] = grade
    }
}

module.exports={
student
}

// key points - 