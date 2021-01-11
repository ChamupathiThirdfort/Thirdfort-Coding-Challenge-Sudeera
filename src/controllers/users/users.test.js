import mongoose from "mongoose";
import { userLogin, userSignUp } from "./users.helper";

const users = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "PKqy6aRE",
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "u6Jya6b5",
  },
  {
    username: "user3",
    email: "user3@example.com",
    password: "3UtTgfkh",
  },
];

// Open the DB connection
beforeAll(async () => {
  await mongoose.connect(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
});

// User Signup
describe("User Signup", () => {
  test("Add new User", async () => {
    await Promise.all(
      users.map(async (user) => {
        try {
          await userSignUp(user.username, user.email, user.password);
        } catch (err) {
          expect(err.message).toBe(undefined);
        }
      })
    );
  });
});

// User Login
describe("User Login", () => {
  test("Auth Not Exist User", async () => {
    try {
      await userLogin("a@a.lk", "abc123");
    } catch (err) {
      expect(err.message).toBe("User Not Exists:400");
    }
  });

  test("Auth Existing User", async () => {
    await Promise.all(
      users.map(async (user) => {
        const AddedUser = await userLogin(user.email, user.password);
        expect(typeof AddedUser).toBe("string");
      })
    );
  });
});

// Closing the DB connection allows Jest to exit successfully
afterAll((done) => {
  mongoose.connection.close();
  done();
});
