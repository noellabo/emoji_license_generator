const typeorm = require("typeorm");
const fs = require('fs');
const ejs = require('ejs');
const yaml = require('js-yaml');

var EntitySchema = typeorm.EntitySchema;

const config = yaml.load(fs.readFileSync('../misskey/.config/default.yml', 'utf8'))

function copyingConditionFromLicense(license) {
  if (license.match(/^allow:|^allow$|\bpublic domain\b|パブリックドメイン/i)) {
    return 'allow';
  } else if (license.match(/^deny:|^deny$/i)) {
    return 'deny';
  } else {
    return 'conditional';
  }
};

typeorm.createConnection({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.pass,
    database: config.db.db,
    synchronize: false,
    entities: [
        new EntitySchema(require("./entity/Emoji")),
    ]
}).then(async connection => {

    const emojiRepository = connection.getRepository("Emoji");
    const emojis = await emojiRepository.createQueryBuilder().where("license IS NOT NULL AND license != ''").getMany();

    var temp = fs.readFileSync('./template.ejs', 'utf-8');
    fs.writeFileSync('./public/emoji_license.html', ejs.render(temp, { url: config.url, emojis: emojis.map(emoji => ({
      ...emoji,
      copy: copyingConditionFromLicense(emoji.license),
    })) }));
    fs.writeFileSync('./public/emoji_license.json', JSON.stringify(emojis.map(emoji => ({
      uri: `${config.url}emojis/${emoji.name}`,
      name: emoji.name,
      url: emoji.publicUrl,
      copy: copyingConditionFromLicense(emoji.license),
      license: emoji.license
    }))));

}).catch(function(error) {
    console.log("Error: ", error);
});
