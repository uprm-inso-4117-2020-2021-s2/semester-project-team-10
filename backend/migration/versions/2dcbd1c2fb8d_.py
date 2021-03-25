"""empty message

Revision ID: 2dcbd1c2fb8d
Revises: 
Create Date: 2021-03-03 17:54:19.093776

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2dcbd1c2fb8d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_Journal_Entry_id', table_name='Journal_Entry')
    op.drop_table('Journal_Entry')
    op.drop_index('ix_Users_email', table_name='Users')
    op.drop_index('ix_Users_id', table_name='Users')
    op.drop_index('ix_Users_username', table_name='Users')
    op.drop_table('Users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Users',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"Users_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('hashed_password', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='Users_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_Users_username', 'Users', ['username'], unique=True)
    op.create_index('ix_Users_id', 'Users', ['id'], unique=False)
    op.create_index('ix_Users_email', 'Users', ['email'], unique=True)
    op.create_table('Journal_Entry',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"Journal_Entry_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('date', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('moods', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['username'], ['Users.username'], name='Journal_Entry_username_fkey'),
    sa.PrimaryKeyConstraint('id', name='Journal_Entry_pkey')
    )
    op.create_index('ix_Journal_Entry_id', 'Journal_Entry', ['id'], unique=False)
    # ### end Alembic commands ###