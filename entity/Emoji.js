module.exports = {
    name: "Emoji",
    columns: {
        id: {
            primary: true,
            type: "varchar",
            length: 32,
        },
        updatedAt: {
            type: "timestamp with time zone",
            nullable: true,
        },
        name: {
            type: "varchar",
            length: 128,
        },
        host: {
            type: "varchar",
            length: 128,
            nullable: true,
        },
        category: {
            type: "varchar",
            length: 128,
            nullable: true,
        },
        originalUrl: {
            type: "varchar",
            length: 512,
        },
        publicUrl: {
            type: "varchar",
            length: 512,
            default: "",
        },
        uri: {
            type: "varchar",
            length: 512,
            nullable: true,
        },
        type: {
            type: "varchar",
            length: 64,
            nullable: true,
        },
        aliases: {
            type: "varchar",
            length: 128,
            array: true,
            default: "{}",
        },
        license: {
            type: "varchar",
            length: 1024,
            nullable: true,
        }
    }
};
