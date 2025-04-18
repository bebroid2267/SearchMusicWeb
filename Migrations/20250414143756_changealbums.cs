using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace search_musics.Migrations
{
    /// <inheritdoc />
    public partial class changealbums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArtistName",
                table: "Albums",
                newName: "ArtistsName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArtistsName",
                table: "Albums",
                newName: "ArtistName");
        }
    }
}
