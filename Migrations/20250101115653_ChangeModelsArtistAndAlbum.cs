using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace search_musics.Migrations
{
    /// <inheritdoc />
    public partial class ChangeModelsArtistAndAlbum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Albumid",
                table: "Tracks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ArtistEntityId",
                table: "Tracks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_Albumid",
                table: "Tracks",
                column: "Albumid");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_ArtistEntityId",
                table: "Tracks",
                column: "ArtistEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Albums_Albumid",
                table: "Tracks",
                column: "Albumid",
                principalTable: "Albums",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Artists_ArtistEntityId",
                table: "Tracks",
                column: "ArtistEntityId",
                principalTable: "Artists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Albums_Albumid",
                table: "Tracks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Artists_ArtistEntityId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_Albumid",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_ArtistEntityId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "Albumid",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "ArtistEntityId",
                table: "Tracks");
        }
    }
}
