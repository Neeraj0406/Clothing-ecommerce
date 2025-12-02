/* migrations/1764695706071_create-users-table.js (CommonJS) */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // create users table
  pgm.createTable('users', {
    id: 'id', // SERIAL PRIMARY KEY
    name: { type: 'varchar(100)' },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    role: { type: 'int', notNull: true }, // 0=customer,1=merchant,2=admin,3=superadmin
    phone: { type: 'varchar(20)' },
    address: { type: 'text' },
    createdAt: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // Add comments via raw SQL (works on all node-pg-migrate versions)

  pgm.sql(
    `COMMENT ON COLUMN users.role IS '0=customer, 1=merchant, 2=admin, 3=superadmin';`
  );
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
