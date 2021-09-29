const pg = require("pg");

const run = async () => {

    const client = new pg.Client({
        // everyone should do this
        database: "puppies",
        // you may not need these:
        user: "joe-alves",
        password: "buttons"
    });
    await client.connect();

    // Add new rows to our dogs table.
    const seedNewData = async () => {

        const insertNewDogSQL = `INSERT INTO dogs(name, breed) VALUES($1, $2)`;

        await client.query(insertNewDogSQL, ["Atlas", "Labrador"]);
        await client.query(insertNewDogSQL, ["Zeus", "Husky"]);
        await client.query(insertNewDogSQL, ["Copper", "Australian Shepherd"]);
    };


    try {
        seedNewData();
        const dogs = await client.query("SELECT * FROM dogs");
        console.log(dogs.rows);
    } catch (e) {
        console.log(e)
    }

};
run();