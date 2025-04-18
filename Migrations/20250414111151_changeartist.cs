using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace search_musics.Migrations
{
    /// <inheritdoc />
    public partial class changeartist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Artists_ArtistEntityId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_ArtistEntityId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "ArtistEntityId",
                table: "Tracks");

            migrationBuilder.RenameColumn(
                name: "Artist",
                table: "Tracks",
                newName: "Artists");

            migrationBuilder.AddColumn<string>(
                name: "TrackId",
                table: "Artists",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Artists_TrackId",
                table: "Artists",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artists_Tracks_TrackId",
                table: "Artists",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artists_Tracks_TrackId",
                table: "Artists");

            migrationBuilder.DropIndex(
                name: "IX_Artists_TrackId",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "TrackId",
                table: "Artists");

            migrationBuilder.RenameColumn(
                name: "Artists",
                table: "Tracks",
                newName: "Artist");

            migrationBuilder.AddColumn<string>(
                name: "ArtistEntityId",
                table: "Tracks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_ArtistEntityId",
                table: "Tracks",
                column: "ArtistEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Artists_ArtistEntityId",
                table: "Tracks",
                column: "ArtistEntityId",
                principalTable: "Artists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
