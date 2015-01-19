/**
 * Created by ramya on 1/15/15.
 */
document.addEventListener('DOMContentLoaded', function() {

    function Contact(name, email, phone, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    Contact.prototype.vcard = function() {
        var vCard = 'BEGIN:VCARD\nVERSION:4.0\nFN:'+ this.name +
        '\nTEL;TYPE=home,voice;VALUE=uri:tel: ' +  this.phone +
        '\nADR;TYPE=home;LABEL=' + this.address +
        '\nEMAIL:' + this.email +
        '\nEND:VCARD';

        return btoa(vCard);
    };

    Contact.prototype.getDownloadLink = function() {
        var a = document.createElement('a');
        a.href = 'data:text;base64, ' + this.vcard();
        a.innerHTML = this.name;
        a.download = this.name + '.vcard';
        return a;
    };

    var trs = Array.prototype.slice.call(document.querySelector('tbody').children);
    var contacts = trs.map(function(tr){
        var name = tr.children[3].textContent;
        var email = tr.children[3].firstElementChild.firstElementChild.getAttribute('email');
        var phone = tr.children[5].textContent;
        var address = tr.children[6].textContent;

        return new Contact(name, email, phone, address);

    });

    //var hyperlinks = contacts.map(function (contact) {
    //    return contact.getDownloadLink();
    //});

    var hyperlinks = contacts[37].getDownloadLink();
    document.body.appendChild(hyperlinks);

    //hyperlinks.forEach(appendToPage);
    //
    //function appendToPage(element) {
    //    document.body.appendChild(element);
    //}
    //console.log(contacts);
    //console.log(contacts[37].export());
    //todo: define property
    //todo: hyperlink to download vcard
});