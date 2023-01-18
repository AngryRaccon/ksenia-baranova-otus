process.stdout.write("What is your name? \n");
process.stdin.on("data", (data) => {
  console.log(`Your name is ${data.toString()}`);
  process.exit();
});
