using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace search_musics.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameDownloadUrlTrackModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DonwloadUrl",
                table: "Tracks",
                newName: "DownloadUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DownloadUrl",
                table: "Tracks",
                newName: "DonwloadUrl");
        }
    }
}
