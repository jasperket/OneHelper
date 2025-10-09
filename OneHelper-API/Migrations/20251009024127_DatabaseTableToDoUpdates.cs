using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OneHelper.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseTableToDoUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComplexityScore",
                table: "ToDos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddCheckConstraint(
                name: "CK_ToDo_ComplexityScore",
                table: "ToDos",
                sql: "[ComplexityScore] >= 1 AND [ComplexityScore] <= 10");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_ToDo_ComplexityScore",
                table: "ToDos");

            migrationBuilder.DropColumn(
                name: "ComplexityScore",
                table: "ToDos");
        }
    }
}
